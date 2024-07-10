import { NextFunction, Request, Response } from "express";

export const requireUser = (req: any, res: Response, next: NextFunction) => {
  // console.log({req});
  
  const user = req.user;
  console.log({user});

  if (!user) {
    console.log("no user log");
    return res.sendStatus(403);
  }

  return next();
};
