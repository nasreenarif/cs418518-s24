const express = require("express");
const router = express.Router();
const database = require("../database");
const {hashPassword}=require("../utils/helper");

//user get API
router.get("/", (req, res) => {
  database.execute("select * from user", function (err, result) {
    res.send(result);
  });

  // res.send("Calling user get api")
});

//user post API
router.post("/", (req, res) => {
  try {

    const hashedPassword=hashPassword(req.body.u_password);

    // console.log(hashedPassword)

    database.execute(
      "insert into user (u_first_name,u_last_name,u_email,u_password,is_approved,is_admin) values (?,?,?,?,?,?)",
      [
        req.body.u_first_name,
        req.body.u_last_name,
        req.body.u_email,
        // req.body.u_password,
        hashedPassword,
        0,
        0,
      ],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(500).send("Record not inserted");
        } else {
          res.status(200).send("Record inserted successfully");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

//user put API
router.put("/:id", (req, res) => {
  try {
    // u_first_name | u_last_name | u_email        | u_password | is_approved | is_admin
    database.execute(
      "update user set u_first_name=?, u_last_name=? where u_id=?",
      [req.body.u_first_name, req.body.u_last_name, req.params.id],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(401).send("Record not found");
        } else {
          res.status(200).send("Record updated successfully");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});


//user getbyid API
router.get("/:id", (req, res) => {
  try {
    // u_first_name | u_last_name | u_email        | u_password | is_approved | is_admin
    database.execute(
      "select * from user where u_id=?",
      [req.params.id],
      function (err, result) {
        if (result == 0) {
          res.status(401).send("Record not found");
        } else {
          res.status(200).send(result);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});


//user getbyid API
router.delete("/:id", (req, res) => {
  try {
    // u_first_name | u_last_name | u_email        | u_password | is_approved | is_admin
    database.execute(
      "delete from user where u_id=?",
      [req.params.id],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(401).send("Record not deleted");
        } else {
          res.status(200).send("Record deleted successfully!");
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
