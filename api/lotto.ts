import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { LottoPostReq } from "../model/lotto_post_req";

export const router = express.Router();

// get all lotto
router.get("/", (req, res) => {
  let sql = "SELECT * FROM lotto";

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        response: false,
        message: "Failed to load data",
      });
    }
    if (result != "") {
      res.status(200).json({
        response: true,
        result,
      });
    }
  });
});

// insert 100 lotto from random at admin
router.post("/", (req, res) => {
  let lottoNum = req.body.numbers;
  let value = lottoNum.map((num: any) => [num]);

  let sql = "INSERT INTO lotto (number) VALUES ?";
  sql = mysql.format(sql, [value]);

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ response: true, message: "Number has been updated" });
  });
});

// delete all lotto
router.delete("/", (req, res) => {
  let sql1 = "DELETE FROM lotto";
  conn.query(sql1, (err, result) => {
    if(err) throw err;
    res.status(200).json({response:true});
})
})

// select lotto that not has been sell
router.get("/notsell", (req, res) => {
  let sql = "SELECT * FROM lotto WHERE sell = 0";

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ response: true, result });
  });
});

// select lotto that already sell
router.get("/sell", (req, res) => {
  let sql = "SELECT * FROM lotto WHERE sell != 0";

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ response: true, result });
  });
});

// random number from all lotto
router.get("/jackpotall", (req, res) => {
  let sql = "SELECT * FROM lotto WHERE sell = 0 ORDER BY RAND() LIMIT 5";

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ response: true, result });
  });
});

// random number from sell lotto
router.get("/jackpotsell", (req, res) => {
  let sql = "SELECT * FROM lotto WHERE sell != 0 ORDER BY RAND() LIMIT 5";

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({ response: true, result });
  });
});

// update Jackpot lotto from all lotto
router.put("/jackpotall", async (req, res) => {
  let lottoNum = req.body.numbers;
  let value = lottoNum.map((num: any) => [num]);
  let sql1 = "UPDATE lotto SET win = 0";
    await new Promise((resolve, reject) => {
      conn.query(sql1, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

  let sql = "UPDATE lotto SET win = ? WHERE number = ?";

  let winValues = [1, 2, 3, 4, 5];
  let promises = lottoNum.map((num: any, index:number) => {
    let formattedSql = mysql.format(sql, [winValues[index], num]);

    // Return a promise for each query
    return new Promise((resolve, reject) => {
      conn.query(formattedSql, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
  res.status(200).json({response: true})
});

// update Jackpot lotto from only lotto that has been sell
router.put("/jackpotsell", async (req, res) => {
let lottoNum = req.body.numbers;
  let value = lottoNum.map((num: any) => [num]);
  let sql1 = "UPDATE lotto SET win = 0";
    await new Promise((resolve, reject) => {
      conn.query(sql1, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

  let sql = "UPDATE lotto SET win = ? WHERE number = ? AND sell != ?";

  let winValues = [1, 2, 3, 4, 5];
  let promises = lottoNum.map((num: any, index:number) => {
    let formattedSql = mysql.format(sql, [winValues[index], num, 0]);

    // Return a promise for each query
    return new Promise((resolve, reject) => {
      conn.query(formattedSql, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });
  res.status(200).json({response: true})
  });