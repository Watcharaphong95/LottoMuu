import express, { response } from "express";
import { conn } from "./dbconnect";
import cors from "cors";
import { router as user } from './api/user';
import { router as index } from "./api/index";
import { router as lotto } from "./api/lotto";
import { router as admin } from "./api/admin";
import { router as money } from "./api/money";
import { router as basket } from "./api/basket";
import bodyParser from "body-parser";

export const app = express();


app.use(bodyParser.text());
app.use(bodyParser.json());
// app.use("/", (req, res) => {
//     res.send("Hello world");
// })
app.use("/", index);
app.use("/user", user);
app.use("/lotto", lotto);
app.use("/admin", admin);
app.use("/money", money);
app.use("/basket", basket);