import TimeClock from '../../src/models/TimeClock.model';

describe('TimeClock', () => {
  const job = {id: "1", number: "WO12222"};
  const employee = {id: "1", firstName: "Steffen", lastName: "Andersland"};

  describe("addEntry", () => {
    const tc = TimeClock.start();
    tc.addEntry(job.id, employee.id);
    it("should create an entry with a timeIn property", () => {
      expect(tc.entries).toBeInstanceOf(Array);
      expect(tc.entries[0]).toHaveProperty("timeIn");
    });
  });

});