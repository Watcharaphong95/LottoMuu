import mysql from "mysql";
import util from "util";

export const conn = mysql.createPool({
    connectionLimit: 10,
    host: "mysql-lottomuu.alwaysdata.net",
    user: "lottomuu",
    password: "lotto123",
    database: "lottomuu_database",
})
// export const conn = mysql.createPool({
//     connectionLimit: 10,
//     host: "sql12.freemysqlhosting.net",
//     user: "sql12728153",
//     password: "rkpi3VbjuF",
//     database: "sql12728153",
// })

export const queryAsync = util.promisify(conn.query).bind(conn);

