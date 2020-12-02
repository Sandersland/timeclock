import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import timeEntryRoutes from './routes/TimeEntry.route';
import employeeRoutes from './routes/Employee.route';
import jobRoutes from './routes/Job.route';
import {errorHandler} from './utils';

const app = express();

app.use(bodyParser.json());

app.use("/employees", employeeRoutes);
app.use("/jobs", jobRoutes);
app.use("/entries", timeEntryRoutes);

app.use(errorHandler);

mongoose.connect("mongodb://localhost:27017").then(() => {
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
}).catch(console.error);
