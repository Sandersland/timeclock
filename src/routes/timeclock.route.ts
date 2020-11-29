import {Router} from 'express';

import {NotFoundError, qsFilter} from '../utils';
import TimeClock from "../models/TimeClock.model";
import Job from '../models/Job.model';
import Employee from '../models/Employee.model';

const employee = new Employee("Steffen", "Andersland");
const job = new Job("WO20333");

const tc = TimeClock.start();

tc.addEntry(job, employee);

const router = Router();

router.get("/", (req, res) => {
  const entries = qsFilter(req.query, tc.entries);
  if (!entries.length) {
    throw new NotFoundError("No timeclock entries found.");
  }
  res.json({status: "success", payload: entries});
});

export default router;