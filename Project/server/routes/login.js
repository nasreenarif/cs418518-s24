const express = require("express");
const router = express.Router();
const database = require("../database");
const { comparePassword } = require("../utils/helper");

router.post("/", (req, res) => {
  try {
    database.execute(
      "select * from user where u_email=?",
      [req.body.u_email],
      function (err, result) {
        if (result.length == 0) {
          res
            .status(401)
            .send(
              "Invalid email and password. Please try again with valid credentials"
            );
        } else {
          if (comparePassword(req.body.u_password, result[0].u_password)) {
            res.status(200).send("User loggedin successfully!");
          } else {
            res
              .status(401)
              .send(
                "Invalid email and password. Please try again with valid credentials"
              );
          }
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
