import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { LottoPostReq } from "../model/lotto_post_req";

export const router = express.Router();

// get all lotto
router.get("/", (req, res) => {
    let sql = "SELECT * FROM lotto";

    conn.query(sql, (err, result) => {
        if(err){
            res.status(400).json({
                response: false,
                message: "Failed to load data"
            })
        }
        if(result != ""){
            res.status(200).json({
                response: true,
                result
            })
        }
    })
})

// insert 100 lotto from random at admin
router.post("/:num", (req, res) => {
    let lottoNum = req.params.num;

    let sql = "INSERT INTO lotto (number) VALUES(?)";
    sql = mysql.format(sql, [
        lottoNum
    ])

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json({response: true, message: "Number has been updated"})
    })
})