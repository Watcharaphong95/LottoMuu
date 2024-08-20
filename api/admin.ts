import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";

export const router = express.Router();

// reset system!!!
router.get("/", (req, res) => {
    let sql = "DELETE FROM lotto";
    let sql1 = "DELETE FROM user WHERE uid != 1"

    conn.query(sql, (err, result) => {
        if(err) throw err;
    })
    conn.query(sql1, (err, result) => {
        if(err) throw err;
    })
    res.status(200).json({response: true})
});