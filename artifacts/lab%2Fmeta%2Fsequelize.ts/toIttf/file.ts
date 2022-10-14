@Table
class Person extends Model {
  @Column
  name: string

  @Column
  birthday: Date

  @HasMany(()=> Hobby)
  hobbies: Hobby[] 
}