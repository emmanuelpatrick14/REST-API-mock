import { Request, Response } from "express";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import config from "config";
import { signjwt } from "../utils/jwt.utils";

export async function creatUserSessionHandler(req: Request, res: Response) {
  // validate user password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("invalid credentials");
  }
  // createa session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // console.log(user)
  // create an acess token...
  const accessToken = signjwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenTtl") }
  ); //15min

  // create a refesh token
  const refreshToken = signjwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("refreshTokenTtl") }
  ); //1 yr

  // return acess and refres tokens
  return res.status(200).send({
    accessToken,
    refreshToken,
  });
}

export async function getUserSessionsHandler(req: any, res: Response) {
  console.log('entered getUserSessionsHandler');
  
  const userId = req.user?._id; //gotten from the req obj deserialize func
  
  console.log({ userIdhered: userId });
  const sessions = await findSessions({ user: userId, valid: true });

  return res.send({sessions});
}

export async function deleteSessionHandler(req: Request, res: any) {
  const sessionId = res.user?.session;
  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
