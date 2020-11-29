import Job from "./Job.model";
import Employee from "./Employee.model";

interface TimeEntry {
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

  addEntry(job: Job, employee: Employee): void {
    let currentEntry: TimeEntry;
    let lastEntry: TimeEntry;
    const now = TimeClock.now();
    const employeeEntries = this.entries.filter((entry) => employee.id === entry.userId);
    if (employeeEntries.length > 0) {
      lastEntry = employeeEntries[employeeEntries.length -1];
      if (!lastEntry.hasOwnProperty("timeOut")) {
        lastEntry.timeOut = now;
        return;
      } 
    } 
    
    currentEntry = {
      userId: employee.id,
      jobId: job.id,
      timeIn: now
    }

    this.entries.push(currentEntry);
  }
  
  private static now(): number {
    return Math.floor(Date.now() / 1000);
  }
}