const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

const mysql = require("mysql2");
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ananya17$",
//   database: "User_Click",
// });
const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});
pool.query(
  "CREATE TABLE IF NOT EXISTS user_click_info(username VARCHAR(300), ip VARCHAR(100), event VARCHAR(50), batch_id VARCHAR(200))",
  (err, res) => {
    if (err) throw err;
    console.log("Table checked/created successfully");
  }
);

// con.connect((err) => {
// if (err) throw err;
// const createDatabaseQuery = "CREATE DATABASE User_Click";
// const createUserInfoTableQuery =
//   "Create table user_click_info(username Varchar(300),ip Varchar(100), event Varchar(50))";
// const alterTableAddBatchIdQuery =
//   "ALTER TABLE user_click_info ADD COLUMN batch_id VARCHAR(200)";
// const delete_col = "ALTER TABLE user_click_info DROP COLUMN batch_id";
// const delete_rows = "delete from user_click_info where username='Jayti'";
// con.query(delete_rows, (err, res) => {
//   if (err) throw err;
//   console.log("Table altered successfully");
// });
// });
let userData = [];
app.get("/", (req, res) => {
  res.render("form");
});

app.post("/", (req, res) => {
  res.redirect("/button-page?username=" + req.body.username);
});

app.get("/button-page", (req, res) => {
  res.render("button", { username: req.query.username, showMessage: false });
});

app.post("/button-page", (req, res) => {
  userData.push({
    username: req.body.username,
    ip: req.ip,
    event: req.body.button,
  });
  res.render("button", { username: req.body.username, showMessage: true });
});

setTimeout(() => {
  if (userData.length > 0) {
    // con.connect((err) => {
    if (err) throw err;
    let btn_click_data = userData.map((data) => [
      data.username,
      data.ip,
      data.event[0],
      Date.now().toString(),
    ]);
    // const insertDataQuery =
    //     "Insert into user_click_info(username,ip,event,batch_id) Values ?";
    //   con.query(insertDataQuery, [btn_click_data], (err, res) => {
    //     if (err) throw err;
    //     console.log("Data inserted successfully", res);
    //   });
    // });
    const insertDataQuery =
      "INSERT INTO user_click_info(username, ip, event, batch_id) VALUES($1, $2, $3, $4)";
    btn_click_data.forEach((data) => {
      pool.query(insertDataQuery, data, (err, res) => {
        if (err) throw err;
        console.log("Data inserted successfully", res.rowCount);
      });
    });
    userData = [];
  }
}, 20 * 1000);
app.listen(8000);
