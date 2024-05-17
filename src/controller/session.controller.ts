import { Request, Response } from "express"
import { createSession, findSessions } from "../service/session.service"
import { validatePassword } from "../service/user.service"
import { signjwt } from "../utils/jwt.utils"
import config from "config"

export async function creatUserSessionHandler(req: Request, res:Response) {
    // validate user password 
   const user = await validatePassword(req.body)

   if(!user){
       return res.status(401).send("invalid credentials")
    }
    // createa session 
    const session  = await createSession(user._id,req.get("user-agent") || "")


    // create an acess token...
    const accessToken = signjwt({
        ...user,session: session._id},
    {expiresIn: config.get("accessTokenTtl")}) //15min
     


    // create a refesh token  
    const refreshToken = signjwt({
        ...user,session: session._id},
    {expiresIn: config.get("refreshTokenTtl")}) //1 yr
     


    // return acess and refres tokens 
    return res.status(200).send({
        accessToken,
        refreshToken
    })
}

export async function getUserSessionsHandler(req: Request, res:Response) {
    const userId = res.locals.user._id //gotten from the deserialize func
    console.log({hered:userId})
    const sessions = await findSessions({user:userId,valid:true})
   

    return res.send(sessions)

}