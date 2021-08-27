const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const { v4 } = require("uuid");
const nodemailer = require("nodemailer");
const { rejectNonAdmin } = require("../modules/authorization-middleware");
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

//Handles Ajax request to grab all of the users 
router.get('/all', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  //The SQL Statement
  const queryText = 'SELECT * FROM "user" ORDER BY "access_level" DESC;';

  pool.query(queryText)
  .then((result) => {
      res.send(result.rows);
  })
  .catch((error) => {
      console.log("Error in GET all users", error);
  })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email
  const token = v4();
  const accessLevel = req.body.access_level
  const msgBody = `<h1>Reset Your Password</h1><p>Follow this link to reset your password: http://localhost:3000/#/register/${token}</p>`
  // console.log('token is:', token);

  const queryText = `INSERT INTO "user" (username, password, token, access_level)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [username, password, token, accessLevel])
    .then(() => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PW
        }
      })
      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: `YourPath - Reset Your Password`,
        html: msgBody,
        replyTo: process.env.NODEMAILER_EMAIL
      }
      transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', res)
        }
      })
    }) //node mailer would happen in the .then here
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

//TODO:
//Protect this for just admin
//Don't take the password from req.body - reuse the token
//Probably don't want the token hanging out on the database for all time (expiration date? delete?)

router.put("/newPassword", (req, res) => {
  const newPassword = encryptLib.encryptPassword(req.body.password);
  const token = req.body.token;
  const username = req.body.username;

  console.log('newPassword, token, username', newPassword, token, username);

  const queryText = `UPDATE "user" SET "password" = $1
                      WHERE "user".token = $2 AND "user".username = $3;`;

  pool
    .query(queryText, [newPassword, token, username])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put("/edit", rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  console.log(req.body);

  const username = req.body.username;
  const accessLevel = req.body.access_level;
  const token = req.body.token

  let queryText = `UPDATE "user" SET "username" = $1, "access_level" = $2 WHERE "token" = $3;`;

  pool.query(queryText, [username, accessLevel, token])
  .then(response => {
    res.sendStatus(202)
  }).catch(err => {
    console.log('Error in User PUT', err);
    res.sendStatus(500);
  })
})

module.exports = router;
