import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import timeClockRoutes from './routes/timeclock.route';
import employeeRoutes from './routes/employee.route';
import jobRoutes from './routes/job.route';
import {errorHandler} from './utils';

const app = express();

app.use(bodyParser.json());

app.use("/employees", employeeRoutes);
app.use("/jobs", jobRoutes);
app.use("/timeclock", timeClockRoutes);

app.use(errorHandler);

mongoose.connect("mongodb://localhost:27017").then(() => {
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
}).catch(console.error)
