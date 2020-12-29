/* app.use("/", (req, res, next) => {
  res.send("Bienvenido a la HomePage");
}); */

// Ocupamos get porque es la forma de trabajar de express. Cuando ponemos app.get express ya sabe que vamos a trabajar con rutas, en cambio si ponemos app.use es como decirle a express tenes que ocupar esta herramienta en toda la aplicacion.
const express = require("express");
// router es un objeto que seria como una mini aplicacion dentro de app dentro de express para trabajar con rutas. Esto si me sirve porque si estoy trabajando con app es porque es algo que va cross aplicacion y si vos estas trabajando con router, es porque estas trabajando el problema de las rutas de esa forma.
const router = express.Router();
const userRoutes = require('./user')
const tweetRoutes = require('./tweets')

/* router.get("/", (req, res, next) => {
  res.send("Bienvenido a la HomePage");
}); */

router.use("/users", userRoutes)
router.use('/tweets', tweetRoutes)
router.use('/', tweetRoutes)

module.exports = router;
