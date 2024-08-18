import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { UserRegisterPost } from "../model/user_register_req";
import { UserLoginPost } from "../model/user_login_req";

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
});

// register
router.post("/register", (req, res) => {
  let userDetail: UserRegisterPost = req.body;

  let sql =
    "INSERT INTO user (uid, name, email, password, money) VALUES (?,?,?,?,?)";
  sql = mysql.format(sql, [
    userDetail.uid,
    userDetail.name,
    userDetail.email,
    userDetail.password,
    userDetail.money,
  ]);

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        response: false,
        message: "This email already register",
      });
    } else {
      res.status(201).json({
        response: true,
        message: "affectedRows " + result.affectedRows,
      });
    }
  });
});

// get user by email
router.get("/:email", (req, res) => {
  let userEmail = req.params.email;

  let sql = "SELECT * FROM user WHERE email = ?";
  sql = mysql.format(sql, [userEmail]);

  conn.query(sql, (err, result) => {
    if (err) throw err;
    if (result != "") {
      res.status(200).json({
        result,
        response: true,
      });
    }
  });
});

// Login use email and password
router.post("/login", (req, res) => {
  let userLogin: UserLoginPost = req.body;

  let sql = "SELECT * FROM user WHERE email = ?";
  sql = mysql.format(sql, [userLogin.email]);

  conn.query(sql, (err, result) => {
    if (err) throw err;
    if (result[0].password == userLogin.password) {
      res.status(200).json({
        message: "Login Complete",
        response: true,
      });
    } else {
      res.status(200).json({
        message: "Wrong password or gmail",
        response: true,
      });
    }
  });
});
