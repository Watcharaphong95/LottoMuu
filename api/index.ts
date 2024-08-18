import express from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";

export const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello world");
});