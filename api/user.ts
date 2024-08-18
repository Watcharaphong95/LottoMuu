import express, { response } from 'express';
import { conn, queryAsync } from '../dbconnect';
import mysql from 'mysql';
import { UserRegisterPost } from '../model/user_register_req';

export const router = express.Router();

// get all user
router.get("/", (req, res) => {
    const sql = "select * from user";

    conn.query(sql, (err, result) => {  
      if (err) throw err;
      if (result != "") {
        res.status(200).json({ result, response: true });
      } else {
        res.status(200).json({ response: false });
      }
    });
})

// register
router.post("/register", (req, res) => {
    let userDetail: UserRegisterPost = req.body;

    let sql = "INSERT INTO user (uid, name, email, password, money) VALUES (?,?,?,?,?)";
    sql = mysql.format(sql, [
        userDetail.uid,
        userDetail.name,
        userDetail.email,
        userDetail.password,
        userDetail.money,
    ])

    conn.query(sql, (err, result) => {
        if(err){
            res.status(400)
            throw err;
        };
        res.status(201).json({
            response: true,
            affected_row: result.affectedRows,
        })
    })
})