import TimeClock from "./TimeClock";

const employee = {
  id: 1,
  firstName: "Steffen",
  lastName: "Andersland"
}

const job = {
  id: 1,
  number: "WO20333"
}

const tc = TimeClock.start();

tc.addEntry(job, employee);
tc.addEntry(job, employee);
tc.addEntry(job, employee);
tc.addEntry(job, employee);

console.log(tc.entries);
