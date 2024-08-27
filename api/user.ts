import express, { response } from "express";
import { conn, queryAsync } from "../dbconnect";
import mysql from "mysql";
import { UserRegisterPost } from "../model/user_register_req";
import { UserLoginPost } from "../model/user_login_req";
import { UserEditPut } from "../model/user_edit_req";
import { UserMoneyPut } from "../model/user_money_req";
import { MoneyPostReq } from "../model/money_post_req";
import { UserGoogleLoginPost } from "../model/user_Glogin_req";

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

// Login use google (if no account in database create new one!)
router.post("/login/google", (req, res) => {
  let googleLogin: UserGoogleLoginPost = req.body;

  let sql = "SELECT * FROM user WHERE email = ?"
  sql = mysql.format(sql, [googleLogin.email]);
  conn.query(sql, (err, result) => {
    if(err) throw err;
    if(result != ""){
      res.status(200).json({
        message: "Login Complete",
        response: true,
      });
    } else {
      let sql1 = "INSERT INTO user (name, email, money) VALUES (?,?,?)";
      sql1 = mysql.format(sql1, [googleLogin.email, googleLogin.email, googleLogin.money ])
      conn.query(sql1, (err, result) => {
        if(err) throw err;
        res.status(201).json({
          response: true,
          message: "affectedRows " + result.affectedRows,
        });
      })
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
    if (result != "") {
      if (result[0].password == userLogin.password) {
        res.status(200).json({
          message: "Login Complete",
          response: true,
        });
      } else {
        res.status(200).json({
          message: "Wrong password or gmail",
          response: false,
        });
      }
    } else {
      res.status(200).json({
        message: "Wrong password or gmail",
        response: false,
      });
    }
  });
});

// User Edit Profile
router.put("/edit", (req, res) => {
  let newUserDetail: UserEditPut = req.body;

  let sql = "UPDATE user SET name = ?, nickname = ?, birth = ?, gender = ?, phone = ? WHERE email = ?";
  sql = mysql.format(sql, [
    newUserDetail.name,
    newUserDetail.nickname,
    newUserDetail.birth,
    newUserDetail.gender,
    newUserDetail.phone,
    newUserDetail.email,
  ]);

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        response: false,
        message: "Update profile not completed",
      });
    } else {
      res.status(201).json({
        response: true,
        message: "Update profile complete",
      });
    }
  });
});

// Forget password
router.put("/resetpass", (req, res) => {
  let newUserDetail: UserLoginPost = req.body;

  let sql = "UPDATE user SET password = ? WHERE email = ?";
  sql = mysql.format(sql, [newUserDetail.password, newUserDetail.email]);

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        response: false,
        message: "Failed password not changed",
      });
    } else {
      res.status(201).json({
        response: true,
        message: "Password has been changed completed",
      });
    }
  });
});

// update money value
router.put("/money", (req, res) => {
  let userDetail: UserMoneyPut = req.body;

  let sql = "UPDATE user SET money = ? WHERE email = ?";
  sql = mysql.format(sql, [userDetail.money, userDetail.email]);

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({
        response: false,
        message: "Money has been not updated",
      });
    } else {
      res.status(200).json({
        response: true,
        message: "Money has been updated",
      });
    }
  });
});