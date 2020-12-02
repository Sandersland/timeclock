import * as mongoose from 'mongoose';

export interface IEmployee extends mongoose.Document {
  firstName: string;
  lastName: string;
}

const EmployeeSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true}
});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;