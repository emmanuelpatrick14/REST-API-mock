import UserModel, { UserDocument } from "../models/user.model";
import { DocumentDefinition } from "mongoose";
export async function createUser(input: DocumentDefinition<Omit<UserDocument,"createdAt"|"updatedAt"|"comparePassword">>) {
  try {
    return await UserModel.create(input);
  } catch (error:any) {
    throw new Error(error);
  }
}
