import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import { creatUserInput } from "schema/user.schema";
import {omit} from "lodash"

export async function createUserHandler(req: Request<{},{},creatUserInput['body']>, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(),"password"));
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
}
