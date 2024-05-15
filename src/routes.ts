import { createUserHandler } from "./controller/user.controller";
import { Express, Request, Response } from "express";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    console.log("gdgggs");
    res.sendStatus(200);
  });
  //======
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
}

export default routes;
