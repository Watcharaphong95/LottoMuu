import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { MoneyPostReq } from "../model/money_post_req";


export const router = express.Router();

// select record from money
router.get("/", (req, res) => {
    let sql = "SELECT * FROM money";

    conn.query(sql, (err, result) => {
      if (err) throw err;
      if (result != "") {
        res.status(200).json({ result, response: true });
      } else {
        res.status(200).json({ response: false });
      }
    });
  })

// select record from money
router.get("/:uid", (req, res) => {
    let uid = req.params.uid;

    let sql = "SELECT * FROM money WHERE m_uid = ?";

    sql = mysql.format(sql, [
        uid
    ])

    conn.query(sql, (err, result) => {
      if (err) throw err;
      if (result != "") {
        res.json(result);
      } else {
        res.status(200).json({ response: false });
      }
    });
  })

// select record from money type 0
router.get("/:uid/:type", (req, res) => {
  let uid = req.params.uid;
  let type = req.params.type;

  let sql = "SELECT * FROM money WHERE m_uid = ? AND type = ?";

  sql = mysql.format(sql, [
      uid,
      type
  ])

  conn.query(sql, (err, result) => {
    if (err) throw err;
    if (result != "") {
      res.json(result);
    } else {
      res.status(200).json({ response: false });
    }
  });
})

// insert money into table money history
router.post("/add", (req, res) => {
    let moneyDetail: MoneyPostReq = req.body;
    let sql = "INSERT INTO money (m_uid, value, type) VALUES (?,?,?)";
  
    sql = mysql.format(sql, [
      moneyDetail.m_uid,
      moneyDetail.money,
      moneyDetail.type
    ])
  
    conn.query(sql, (err, result) => {
      if(err) throw err;
      res.status(200).json({response: true,message: "Money has been add to history"});
    })
  })