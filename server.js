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
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ananya17$",
  database: "User_Click",
});

con.connect((err) => {
  if (err) throw err;
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
});
let userData = [];
app.get("/user", (req, res) => {
  res.render("form");
});

app.post("/user", (req, res) => {
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
    con.connect((err) => {
      if (err) throw err;
      let btn_click_data = userData.map((data) => [
        data.username,
        data.ip,
        data.event[0],
        Date.now().toString(),
      ]);
      const insertDataQuery =
        "Insert into user_click_info(username,ip,event,batch_id) Values ?";
      con.query(insertDataQuery, [btn_click_data], (err, res) => {
        if (err) throw err;
        console.log("Data inserted successfully", res);
      });
    });
    userData = [];
  }
}, 20 * 1000);
app.listen(8000);
