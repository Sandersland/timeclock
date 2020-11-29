import {ErrorRequestHandler} from 'express';
import {ParsedQs} from 'qs';

export class NotFoundError extends Error {
  constructor(message:string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) return;
  console.error(err.stack);
  if (err.name === "NotFoundError") {
    return res.status(404).json({status: "error", message: err.message});
  }
  if (err.name === "BadRequestError") {
    return res.status(400).json({status: "error", message: err.message});
  }
  res.status(500).json({status: "error", message: "Unexpected error"});
}

export const qsFilter = (query: ParsedQs, entries: {[index:string]: any}[]) => {
  return entries.filter((entry) => {
    let match = true;
    Object.entries(query).forEach(([key, value]) => {
      if (entry.hasOwnProperty(key)) {
        match = match && value === entry[key].toString();
      } else {
        throw new BadRequestError("Bad Request");
      }
    });
    return match;
  });
}