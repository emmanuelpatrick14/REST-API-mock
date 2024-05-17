import express from "express";
import config from "config";
import connect from "./utils/connect";
// import connect from "utils/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware/deserializeUser";
const app = express();

app.use(express.json());
const port = config.get<number>("port");

app.use(deserializeUser)
app.listen(port, async () => {
  console.log(`Server is running on port ${port} `);
  await connect();
  routes(app);
});
