import { RequestHandler } from 'express';
import { QueryOptions } from 'mongoose';
import Employee from '../models/Employee.model';
import { NotFoundError, BadRequestError } from '../utils';

export const getEmployees: RequestHandler = async (req, res) => {
  const employees = await Employee.find();
  res.json({status: "success", payload: employees});
};

export const getEmployeeById: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;
  const employee = await Employee.findOne({_id: id});

  if (!employee) {
    const error = new NotFoundError(`No employee found with id ${id}`);
    return next(error);
  }
  res.status(200).json({status: "success", payload: employee});
};

export const createEmployee: RequestHandler = async (req, res, next) => {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  try {
    const result = await employee.save();
    res.status(201).json({status: "success", payload: result});
  } catch (err) {
    const error = new BadRequestError("Bad Request");
    next(error);
  }

};

export const updateEmployee: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;

  const response = await Employee.findByIdAndUpdate(
    id, 
    req.body, 
    {new: true} as QueryOptions
  ).exec();

  if (!response) {
    const error = new NotFoundError(`No employee found with id ${id}`);
    return next(error)
  }
  
  res.json({status: "success", payload: response});
};

export const deleteEmployee: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;
  const response = await Employee.findByIdAndDelete(id).exec();
  if (!response) {
    const error = new NotFoundError(`No employee found with id ${id}`);
    return next(error);
  }
  res.json({status: "success", payload: response});
}
