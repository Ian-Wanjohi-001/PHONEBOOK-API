import { contactRouter } from "./routes/routes.js";
import express,{json} from "express";
import dotenv from "dotenv"
dotenv.config()


const app = express();
app.use(json())
app.use("/contacts", contactRouter)

const {PORT}= process.env
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

