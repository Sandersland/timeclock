import {Router} from 'express';

import {NotFoundError} from '../utils';
import TimeClock from "../models/TimeClock.model";
import Job from '../models/Job.model';
import Employee from '../models/Employee.model';

const employee = new Employee("Steffen", "Andersland");
const job = new Job("WO20333");

const tc = TimeClock.start();

tc.addEntry(job, employee);

const router = Router();

router.get("/", (req, res) => {
  res.json({status: "success", payload: tc.entries});
});

export default router;