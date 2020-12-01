import {Router} from 'express';

import {
  getEmployees, 
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controller/Employee.controller';

const router = Router();

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;