import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { OrderPostReq } from "../model/order_post_req";


export const router = express.Router();

// show all list
router.get("", (req, res) => {
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
    let orderDetail: OrderPostReq = req.body;
    let lidValue = req.body.list_lid;
    let value = lidValue.map((lid: any) => [orderDetail.list_uid, lid]);

    let sql = "INSERT INTO list (list_uid, list_lid) VALUES ?";
    sql = mysql.format(sql, [value])

    conn.query(sql, (err, result) => {
        if(err) throw err;
    })

    let updatePromises = lidValue.map((lid: any) => {
        let sql1 = "UPDATE lotto SET owner = ? WHERE lid = ?";
        let formattedSql = mysql.format(sql1, [orderDetail.list_uid, lid]);

        return new Promise<void>((resolve, reject) => {
            conn.query(formattedSql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });

    Promise.all(updatePromises)
            .then(() => {
                res.status(201).json({response: true, message: "Add to list complete"});
            })
            .catch((err) => {
                res.status(500).json({response: false, message: err.sqlMessage});
            });
})