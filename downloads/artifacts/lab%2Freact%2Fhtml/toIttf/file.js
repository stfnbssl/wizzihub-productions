/**
 * There are several ways to fetch data in React when using Function Components and using React Hooks.
 *
 * If the component's rendering relies on some remote data to be available, we can use the useEffect hook to fetch
 * the data and update the state with the fetched data so the component will rerender with the new state. This can be
 * used in simple cases and works similar to the componentDidMount() lifecycle method in class based components.
 *
 * The fetch itself can be done using:
 * - Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
 * - Axios (https://github.com/axios/axios)
 * - or any other XHR library or method
 *
 * Be very careful with useEffect and the dependency array that you pass. If the dependency array is not setup correct
 * it can lead to an infinite loop. To help with this, take a look at the `eslint-plugin-react-hooks` ESLint plugin
 * and read the amazing "Rules of Hooks" document here: `https://reactjs.org/docs/hooks-rules.html`
 * <LoginScreen1 /> component below uses this approach.
 *
 * In more advanced cases where you need to control when the api is called, you can either use the awesome "React Query"
 * library `https://github.com/tannerlinsley/react-query` which is essentially a custom React Hook built around the
 * useEffect hook but it could be overkill if you're not using all its features.
 *
 * The solution that I use in my applications is my own custom React Hook based on useEffect to handle different states
 * and timing of when an API is called. The useFetch hook below is an example of it.
 * <LoginScreen2 /> component below uses this approach.
 *
 * In cases where the API call is dependent on a user action like submitting a form or clicking a button, the call can
 * be made inside a handler function which can then update some state for the component to rerender.
 * Look at `handleSubmitLoginForm` below for an example of this.
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const showError = err => {
  // your custom error display logic
  alert(err);
};

const useFetch = ({ url, initialState = null, skip = false }) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState({}); // used to force running the api fetch in effect

  useEffect(() => {
    let mounted = true;

    if (!skip) {
      setIsLoading(true);

      fetch(url)
        .then(res => res.json())
        .then(result => {
          mounted && setData(result);
        })
        .catch(showError)
        .finally(() => {
          mounted && setIsLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, [url, reload, skip]);

  const reloadData = () => {
    setReload({});
  };

  return { data, setData, isLoading, reloadData };
};

const LoginScreen1 = () => {
  const [data, setData] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(err => showError(err));
  }, []);

  const handleSubmitLoginForm = e => {
    e.preventDefault();

    // This here is pseudo code just to show an example flow
    // - collect form data
    // - submit to authentication API endpoint
    //
    // if (authenticated) {
    //   history.push('/logged_in');
    // } else {
    //   setValidationErrors();
    // }
  };

  return data ? (
    <div>
      <div>{`${data.results[0].name.title} ${data.results[0].name.first}'s Website`}</div>
      <form onSubmit={handleSubmitLoginForm}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  ) : null;
};

const LoginScreen2 = () => {
  const { data, isLoading, reloadData } = useFetch({ url: 'https://randomuser.me/api/' });

  const handleSubmitLoginForm = e => {
    e.preventDefault();
    // look above for pseudo code
  };

  return data ? (
    <div>
      <div>{`${data.results[0].name.title} ${data.results[0].name.first}'s Website`}</div>
      <form onSubmit={handleSubmitLoginForm}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  ) : null;
};

export { LoginScreen1, LoginScreen2 };