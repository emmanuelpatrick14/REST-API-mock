import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyjwt } from "../utils/jwt.utils";

export const deserializeUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log("Request Headers:", req.headers);

  // get acess token from req headers
  const authorizationHeader = req.headers.authorization;
  // console.log(authorizationHeader);

  const accessToken = authorizationHeader
    ? authorizationHeader.split(" ")[1]
    : null;

  // console.log({ accessToken });
  const refreshToken = req.headers["x-refresh"] as string;
  // console.log({ refreshToken });

  if (!accessToken) {
    next();
  }

  // veify access token
  const { decoded, expired } = verifyjwt(accessToken);

  if (decoded) {
    // req.user = decoded;
    req.user = decoded;
    console.log({ decoded });
    next();
  }

  if (expired && refreshToken) {
    console.log(
      "Expired refresh tokenpppppppppppppppppppppppppppppppppppppppppppppppp"
    );

    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken); // Set new access token in response header
      const result = verifyjwt(newAccessToken);
      req.user = result.decoded; // Set the decoded user from new access token
    }
    return next(); // Proceed to the next middleware
  }
  return next();
};
