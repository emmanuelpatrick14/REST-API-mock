import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
//   console.log(session);
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    
    console.log("theon")
  const theone =  SessionModel.find(query).lean();
}
