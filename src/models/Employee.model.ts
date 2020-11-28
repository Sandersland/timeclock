import Model from './Base.model';

export default class Employee extends Model {
  firstName: string;
  lastName: string;

  constructor(firstName:string, lastName:string) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
