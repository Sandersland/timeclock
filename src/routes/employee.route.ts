import {Router} from 'express';

import Employee from '../models/Employee.model';
import {NotFoundError} from "../utils";

const employees = [
  new Employee("Steffen", "Andersland")
];

const router = Router();

router.get("/", (req, res) => {
  res.json({status: "success", payload: employees});
});

router.get("/:id", (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find((employee) => employee.id === employeeId);
  if (!employee) {
    throw new NotFoundError(`No Employee found with ID ${employeeId}`);
  }
  res.json({message: "success", payload: employee});
});

export default router;