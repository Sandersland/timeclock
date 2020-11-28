import Model from './Base.model';

export default class Job extends Model {
  number: string;

  constructor(number: string) {
    super();
    this.number = number;
  }
}