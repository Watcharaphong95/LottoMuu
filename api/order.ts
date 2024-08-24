import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { BasketPostReq } from "../model/basket_post_req";


export const router = express.Router();

// show all list
router.get("/:uid", (req, res) => {
    let sql = "SELECT * FROM list, lotto WHERE list_lid = lid ORDER BY date desc";

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json({response:true, result})
    })
})

// show all list from uid
router.get("/:uid", (req, res) => {
    let uid = req.params.uid;

    let sql = "SELECT * FROM list, lotto WHERE list_lid = lid AND list_uid = ? ORDER BY date desc";
    sql = mysql.format(sql, [
        uid
    ])

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json({response:true, result})
    })
})

// insert to list uid
router.post("/", (req, res) => {
    let basketDetail: BasketPostReq = req.body;

    let sql = "INSERT INTO list (list_uid, list_lid) VALUES (?,?)";
    sql = mysql.format(sql, [
        basketDetail.b_uid,
        basketDetail.b_lid
    ])

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(201).json({response:true, message:"Add to list complete"})
    })
})