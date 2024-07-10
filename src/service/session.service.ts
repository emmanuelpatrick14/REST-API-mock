import { FilterQuery, UpdateQuery } from "mongoose";
import config from 'config'
import SessionModel, { SessionDocument } from "../models/session.model";
// import { signjwt, verifyjwt } from "utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import { signjwt, verifyjwt } from "../utils/jwt.utils";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  //   console.log(session);
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  // console.log("theon");
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

// reissus access tken

export async function reIssueAccessToken({
  refreshToken
}:{refreshToken:string}){
  const {decoded} = verifyjwt(refreshToken)

  if(!decoded || !get(decoded,'_id')) return false


  const session = await SessionModel.findById(get(decoded,'_id'))

  if(!session || !session.valid)return false

  const user = await findUser({_id:session?.user})


  if(!user){
    return false
  }

  const accessToken = signjwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenTtl") }
  ); //15min


  return accessToken;

};
