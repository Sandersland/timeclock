import TimeClock from "./models/TimeClock.model";
import Job from './models/Job.model';
import Employee from './models/Employee.model';


const employee = new Employee("Steffen", "Andersland");
const job = new Job("WO20333");

const tc = TimeClock.start();

tc.addEntry(job, employee);

setTimeout(() => {
  tc.addEntry(job, employee);
  console.log(tc.entries);
}, 2000);


