const express = require("express");
const router = express.Router();
const database = require("../database");
const { comparePassword, verifyTOken } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../utils/sendmail");

router.get("/", verifyTOken, (req, res) => {
  try {
    database.execute(
      "select * from user where u_id=?",
      [req.userId],
      function (err, result) {
        if (result == 0) {
          res.status(401).send("Record not found");
        } else {

          sendEmail(result[0].u_email,"Login Verification","Your one time password is 12345");

          res.status(200).send(result);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

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
            const token = jwt.sign(
              {
                userId: result[0].u_id,
                email: req.body.u_email,
              },
              process.env.TOKEN_SECRET_KEY,
              { expiresIn: "1h" }
            );

            res.status(200).send({
              data: {
                toke: token,
                email: req.body.u_email,
                userId: result[0].u_id,
              },
            });
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
