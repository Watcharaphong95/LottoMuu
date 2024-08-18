import express, { response } from "express";
import { conn } from "./dbconnect";
import cors from "cors";
import { router as user } from './api/user';
import bodyParser from "body-parser";

export const app = express();


app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/user", user);