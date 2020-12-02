import * as mongoose from 'mongoose';

export interface ITimeEntry extends mongoose.Document {
  timeIn: number;
  timeOut?: number;
  userId: string,
  jobId: string
}

const TimeEntrySchema = new mongoose.Schema({
  timeIn: {type: Number, required: true},
  timeOut: {type: Number},
  userId: {type: String, required: true},
  jobId: {type: String, required: true}
});

export default mongoose.model<ITimeEntry>('TimeEntry', TimeEntrySchema);