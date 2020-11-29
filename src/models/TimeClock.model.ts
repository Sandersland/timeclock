import {v4 as uuidv4} from 'uuid';
import Job from "./Job.model";
import Employee from "./Employee.model";

interface TimeEntry {
  id: string;
  userId: string;
  jobId: string;
  timeIn: number;
  timeOut?: number;
}

export default class TimeClock {
  private static instance: TimeClock;
  entries: TimeEntry[];

  private constructor() {
    this.entries = [];
  }
  
  static start() {
    if (!this.instance) {
      this.instance = new TimeClock();
    }
    return this.instance;
  }

  addEntry(jobId: string, employeeId: string): TimeEntry {
    let currentEntry: TimeEntry;
    let lastEntry: TimeEntry;
    const now = TimeClock.now();
    const employeeEntries = this.entries.filter((entry) => employeeId === entry.userId);
    if (employeeEntries.length > 0) {
      lastEntry = employeeEntries[employeeEntries.length -1];
      if (!lastEntry.hasOwnProperty("timeOut")) {
        lastEntry.timeOut = now;
        return lastEntry;
      } 
    } 
  
    currentEntry = {
      id: uuidv4(),
      userId: employeeId,
      jobId: jobId,
      timeIn: now
    }

    this.entries.push(currentEntry);
    return currentEntry;
  }
  
  private static now(): number {
    return Math.floor(Date.now() / 1000);
  }
}