const express = require("express");
const mysql = require("mysql");

const app = express();

//connecting to db and creating login
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  //password: "123456",
  database: "NodeMYSQL"
});

db.connect(err => {
  if (err) throw err;
  console.log("MTSQL created...");
});

//creating routes
//Create a db
app.get("/createDb", (req, res) => {
  //SQL Query
  let sql = "CREATE DATABASE NodeMYSQL";
  db.query(sql, () => {
    console.log(res);
    res.send("Database created");
  });
});

//CREATE Table Posts
app.get("/createTable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created");
  });
});

//INSERT Post 1
app.get("/addpost1", (req, res) => {
  let post = { title: "post1", body: "This is post1" };
  let sql = "INSERT INTO posts SET?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 created...");
  });
});

//INSERT Post 2
app.get("/addpost2", (req, res) => {
  let post = { title: "post2", body: "This is post 2" };
  let sql = "INSERT INTO posts SET?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("Post 2 created...");
  });
});

//GET all post
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM Posts";
  db.query(sql, (err, results) => {
    if (err) throw err;

    res.send(results);
  });
});

//GET any post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM Posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

//UPDATE Post 1
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${
    req.params.id
  }`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post updated");
  });
});

//DELETE a post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id= ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(err);
    res.send("Post deleted succesfully!s");
  });
});

//listening on port 3000
app.listen("3000", () => {
  console.log("Server started on port 3000");
});
