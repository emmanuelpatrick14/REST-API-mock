import { createUserHandler } from "./controller/user.controller";
import { Express, Request, Response } from "express";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import { creatUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    console.log("gdgggs");
    res.sendStatus(200);
  });
  //======
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  
  app.post("/api/sessions", validateResource(createSessionSchema), creatUserSessionHandler);
}

export default routes;
