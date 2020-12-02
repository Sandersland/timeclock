import { RequestHandler } from 'express';
import { QueryOptions } from 'mongoose';
import TimeEntry from '../models/TimeEntry.model';
import { NotFoundError, BadRequestError } from '../utils';

export const getOne: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;
  const timeEntry = await TimeEntry.findOne({_id: id});
  if (!timeEntry) {
    const error = new NotFoundError(`No time entry found with ID ${id}`);
    return next(error);
  }
  res.json({status: 'success', payload: timeEntry});
};

export const getMany: RequestHandler = async (req, res, next) => {
  const timeEntries = await TimeEntry.find();
  res.json({status: 'success', payload: timeEntries});
};

export const createOne: RequestHandler = async (req, res, next) => {;
  try {
    const timeEntry = new TimeEntry(req.body);
    const response = await timeEntry.save();
    res.status(201).json({status: "success", payload: response});
  } catch (err) {
    const error = new BadRequestError("Bad Request");
    next(error);
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;
  const response = await TimeEntry.findByIdAndUpdate(id, req.body, {new: true} as QueryOptions).exec();
  if (!response) {
    const error = new NotFoundError(`No time entry found with ID ${id}.`);
    return next(error);
  }
  res.json({status: 'success', payload: response});
};

export const deleteOne: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;
  const response = await TimeEntry.findByIdAndDelete(id);
  if (!response) {
    const error = new NotFoundError(`No time entry found with ID ${id}.`);
    return next(error);
  }
  res.json({status: "success", payload: response});
};
