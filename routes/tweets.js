const express = require("express");
const router = express.Router();
const tweetBank = require("../tweetBank");

router.get("/", (req, res, next) => {
  const tweetList = tweetBank.list();
  // res.send(tweetList);
  // Esto significa que va a renderizar la vista html y en el segundo parametro, le mando un objeto con el contenido que va a necesitar el archivo index. El key del objeto tiene que coincidir con el del for en el html. En este caso, tweets.
  res.render("index", { tweets: tweetList, showForm: true });
});

router.post("/", (req, res, next) => {
  const name = req.body.name;
  const content = req.body.content;
  tweetBank.add(name, content);
  /* res.send("Tweet agregado"); */
  res.redirect("/");
});

// Tener en cuenta que el req params viene como STRING.
router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const rta = tweetBank.find({ id: id });
  // res.send(rta);
  res.render("index", { tweets: rta, showForm: true });
});

module.exports = router;
