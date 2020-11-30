import {Router} from 'express';

import Employee from '../models/Employee.model';
import {NotFoundError} from "../utils";

const employees: Employee[] = [
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
    throw new NotFoundError(`No employee found with ID ${employeeId}.`);
  }
  res.json({status: "success", payload: employee});
});

router.post("/", (req, res) => {
  const {firstName, lastName} = (req.body as {firstName: string, lastName: string});
  const employee = new Employee(firstName, lastName);
  employees.push(employee);
  res.status(201).json({status: "success", payload: employee});
});

router.patch("/:id", (req, res) => {
  const employeeId = req.params.id;
  const employeeIdx = employees.findIndex((employee) => employee.id === employeeId);
  if (employeeIdx === -1) {
    throw new NotFoundError(`No employee found with ID ${employeeId}.`);
  }
  
  const newEmployee = Object.entries(req.body as {fistName: string, lastName: string})
    .reduce((employee, [key, value]) => {
      return Object.assign(employee, {[key]: value});
    }, employees[employeeIdx]);

  employees[employeeIdx] = newEmployee;
  res.json({status: "success", payload: newEmployee});
});

router.delete("/:id", (req, res) => {
  const employeeId = req.params.id;
  const employeeIdx = employees.findIndex((employee) => employee.id === employeeId);
  if (employeeIdx === -1) {
    throw new NotFoundError(`No employee found with ID ${employeeId}.`);
  }
  
  employees.splice(employeeIdx, 1);
  res.json({status: "success", message: `employee ${employeeId} deleted.`}); 
});

export default router;