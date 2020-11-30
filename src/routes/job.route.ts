import {Router} from 'express';

import {NotFoundError} from '../utils';
import Job from '../models/Job.model';

const jobs = [
  new Job("WO20221"),
  new Job("WO20222")
];

const router = Router();

router.get("/", (req, res) => {
  res.json({status: "success", payload: jobs});
});

router.get("/:id", (req, res) => {
  const jobId = req.params.id;
  const job = jobs.find((job) => job.id === jobId);
  if (!job) {
    throw new NotFoundError(`No job found with ID ${jobId}`);
  }
  res.json({message: "success", payload: job});
});

router.post("/", (req, res) => {
  const {number} = (req.body as {number: string});
  const job = new Job(number);
  jobs.push(job);
  res.status(201).json({status: "success", payload: job});
});

router.patch("/:id", (req, res) => {
  const jobId = req.params.id;
  const jobIdx = jobs.findIndex((job) => job.id === jobId);
  if (jobIdx === -1) {
    throw new NotFoundError(`No employee found with ID ${jobIdx}.`);
  }
  const {number} = (req.body as {number:string});

  const newJob = new Job(number);
  jobs[jobIdx] = newJob;
  res.json({status: "success", payload: newJob});
});

router.delete("/:id", (req, res) => {
  const jobId = req.params.id;
  const jobIdx = jobs.findIndex((job) => job.id === jobId);
  if (jobIdx === -1) {
    throw new NotFoundError(`No employee found with ID ${jobIdx}.`);
  }
  jobs.splice(jobIdx, 1);
  res.json({status: "success", message: `job ${jobId} deleted.`});
});

export default router;