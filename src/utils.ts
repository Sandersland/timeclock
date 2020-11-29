import {ErrorRequestHandler} from 'express';

export class NotFoundError extends Error {
  constructor(message:string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) return;
  console.error(err.stack);
  if (err.name === "NotFoundError") {
    return res.status(404).json({status: "error", message: err.message});
  }
  res.status(500).json({status: "error", message: "Unexpected error"});
}