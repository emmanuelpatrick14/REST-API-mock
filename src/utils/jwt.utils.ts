import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
export function signjwt(object: Object, options?: jwt.SignOptions | undefined) {
  //sign with a private key
  return jwt.sign(object, privateKey, {
    ...(options && options),
    // algorithm: "RS256",
  });
}

export function verifyjwt(token: string) {
  //verufy with a public key
  try {
    const decoded = jwt.verify(token, publicKey);

    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null
    };
  }
}
