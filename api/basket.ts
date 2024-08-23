import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { BasketPostReq } from "../model/basket_post_req";


export const router = express.Router();

// show all basket
router.get("/", (req, res) => {
    let sql = "SELECT * FROM basket";

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json({response:true, result})
    })
})

// show all basket from uid
router.get("/:uid", (req, res) => {
    let uid = req.params.uid;

    let sql = "SELECT * FROM basket WHERE b_uid = ? ORDER BY date desc";
    sql = mysql.format(sql, [
        uid
    ])

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json({response:true, result})
    })
})

// insert to basket uid
router.post("/", (req, res) => {
    let basketDetail: BasketPostReq = req.body;

    let sql = "INSERT INTO basket (b_uid, b_lid) VALUES (?,?)";
    sql = mysql.format(sql, [
        basketDetail.b_uid,
        basketDetail.b_lid
    ])

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(201).json({response:true, message:"Add to basket complete"})
    })
})

// delete in basket from bid
router.delete("/:bid", (req, res) => {
    let bid = req.params.bid;

    let  sql = "DELETE FROM basket WHERE bid = ?";
    sql = mysql.format(sql, [
        bid
    ])

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json({response:true, message:"Delete complete"})
    })
})

// delete in basket from uid
router.delete("/user/:b_uid", (req, res) => {
    let b_uid = req.params.b_uid;

    let  sql = "DELETE FROM basket WHERE b_uid = ?";
    sql = mysql.format(sql, [
        b_uid
    ])

    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json({response:true, message:"Delete complete"})
    })
})