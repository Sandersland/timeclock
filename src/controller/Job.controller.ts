import { RequestHandler } from 'express';
import { QueryOptions } from 'mongoose';
import Job from '../models/Job.model';
import { NotFoundError, BadRequestError } from '../utils';


export const getOne: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;
  const job = await Job.findOne({_id: id});
  if (!job) {
    const error = new NotFoundError(`No job found with ID ${id}`);
    return next(error);
  }
  res.json({status: 'success', payload: job});
}

export const getMany: RequestHandler = async (req, res, next) => {
  const jobs = await Job.find();
  res.json({status: 'success', payload: jobs});
}

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    const job = new Job(req.body);
    const response = await job.save()
    res.status(201).json({status: "success", payload: response});
  } catch (err) {
    const error = new BadRequestError("Bad Request");
    next(error);
  }
}

export const updateOne: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;
  const response = await Job.findByIdAndUpdate(id, req.body, {new: true} as QueryOptions).exec();
  if (!response) {
    const error = new NotFoundError(`No job found with ID ${id}`);
    return next(error);
  }
  res.json({status: 'success', payload: response});
}

export const deleteOne: RequestHandler = async (req, res, next) => {
  const id = (req.params as {id: string}).id;
  const response = await Job.findByIdAndDelete(id);
  if (!response) {
    const error = new NotFoundError(`No job found with ID ${id}`);
    return next(error);
  }
  res.json({status: 'success', payload: response});
}