import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

console.log("privateKey: ", privateKey);
export const signjwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  //sign with a private key
  return jwt.sign(object, privateKey, {
    ...(options && options),
    // algorithm: "RS256",
  });
  
};

export const verifyjwt = (token: string) => {
  console.log("verify jwt called", token);

  //verufy with a public key
  try {

    ///the bug is here
    const decoded = jwt.verify(token, publicKey);

    console.log("verifyjwt has been done");
    console.log({ "decoded":decoded });

    // console.log({decoded:"something else"});
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
