import TimeClock from '../../src/models/TimeClock.model';

describe('TimeClock', () => {
  const job = {id: "1", number: "WO12222"};
  const employee = {id: "1", firstName: "Steffen", lastName: "Andersland"};

  describe("start", () => {
    const tc = TimeClock.start();
    it("timeclock.entries should initially be an empty list", () => {
      expect(tc.entries).toBeInstanceOf(Array);
      expect(tc.entries.length).toBe(0);
    });
  });

  describe("addEntry", () => {
    const tc = TimeClock.start();
    tc.addEntry(job, employee);
    it("should create a single entry with a timeIn property", () => {
      expect(tc.entries).toBeInstanceOf(Array);
      expect(tc.entries.length).toBe(1);
      expect(tc.entries[0]).toHaveProperty("timeIn");
    });
  });

});