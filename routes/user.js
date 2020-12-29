const express = require("express");
const router = express.Router();
const tweetBank = require("../tweetBank");

router.get("/:name", (req, res, next) => {
  const user = req.params.name;
  const rta = tweetBank.find({ name: user });
  // res.send(rta);
  res.render("index", { tweets: rta, showForm: true, username: user });
});

module.exports = router;
