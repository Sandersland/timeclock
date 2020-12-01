import {Router} from 'express';

import {NotFoundError, qsFilter} from '../utils';
import TimeClock from "../models/TimeClock.model";
import Job from '../models/Job.model';
import Employee from '../models/Employee.model';

const employee = new Employee({
  firstName: "Steffen",
  lastName: "Andersland"
});

const job = new Job("WO20333");

const tc = TimeClock.start();

tc.addEntry(job.id, employee.id);

const router = Router();

router.get("/", (req, res) => {
  const entries = qsFilter(req.query, tc.entries);
  if (!entries.length) {
    throw new NotFoundError("No timeclock entries found.");
  }
  res.json({status: "success", payload: entries});
});

router.get("/:id", (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntry = tc.entries.find((entry) => {
    return entry.id = timeEntryId;
  });
  if (!timeEntry) {
    throw new NotFoundError(`No time entry found with ID ${timeEntryId}`);
  }
  res.json({status: "success", payload: timeEntry});
});

router.post("/", (req, res) => {
  const {userId, jobId} = req.body;
  const entry = tc.addEntry(jobId, userId);
  res.status(201).json({status: "success", payload: entry});
});

router.patch("/:id", (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntryIdx = tc.entries.findIndex((entry) => entry.id === timeEntryId);
  if (timeEntryIdx === -1) {
    throw new NotFoundError(`No time entry found with ID ${timeEntryId}`);
  }

  const newTimeEntry = Object.entries(req.body as {timeIn: number, timeOut: number})
    .reduce((timeEntry, [key, value]) => {
      return Object.assign(timeEntry, {[key]: value});
    }, tc.entries[timeEntryIdx]);

    tc.entries[timeEntryIdx] = newTimeEntry;
  res.json({status: "success", payload: newTimeEntry});
});

router.delete("/:id", (req, res) => {
  const timeEntryId = req.params.id;
  const timeEntryIdx = tc.entries.findIndex((entry) => entry.id === timeEntryId);
  if (timeEntryIdx === -1) {
    throw new NotFoundError(`No time entry found with ID ${timeEntryId}`);
  }

  tc.entries.splice(timeEntryIdx, 1);
  res.json({status: "success", message: `time entry ${timeEntryId} deleted.`}); 
});

export default router;