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

export default router;