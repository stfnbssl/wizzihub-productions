fetch("mydata.json")
                .then(response => response.json())
                .then(data => {
                    for (var i = 0; i<data.items.length; i++){
                        let vmovieID = data.items[i].movieID;
                        let vtitle = data.items[i].title;
                        let vposter = data.items[i].poster;
                            document.querySelector("#tb1").innerHTML += `
                                <tr>
                                    <td>${vmovieID}</td>
                                    <td>${vtitle}</td>
                                    <td>${vposter}</td>
                                </tr>`;
                    }
                })