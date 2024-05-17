import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyjwt } from "../utils/jwt.utils";

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get acess token from req headers
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyjwt(accessToken);

  if (decoded) {
    // req.user = decoded;
    res.locals.user = decoded;
    return next();
  }

  
  // Proceed to the next middleware or route handler
  return next();
};
