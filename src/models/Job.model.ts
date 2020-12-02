import * as mongoose from 'mongoose';

export interface IJob extends mongoose.Document {
  number: string;
}

const JobSchema = new mongoose.Schema({
  number: {type: String, required: true}
});

const Job = mongoose.model<IJob>('Job', JobSchema);

export default Job;
