// Express nos permite trabajar de forma mas facil con el servidor. Podriamos hacerlo tambien con Node nativo pero seria mucho mas cargoso.
const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const routes = require("./routes");
const nunjucks = require("nunjucks");

app.use(express.json());
// Esto lo que hace es extraer toda la porcion del body de un income request string y lo expone en el req.body.
app.use(express.urlencoded());

// Cuando ponemos app use lo que le estamos diciendo a app (que es un objeto que tiene diferentes metodos como use y listen) es que alguien puede llegarnos en la ruta barrita y cuando eso suceda nosotros queremos ejecutar la funcion callback.
// req (request) : viene con toda la informacion que el cliente le manda al servidor; res: es la respuesta del server para mandarle al cliente y next nos va a servir como una funcion para navegar entre los middlewares.
// cannot GET / ==> no tenemos nada en el server que este esperando esta ruta.
// app use NO es estricto. Si pongo que en / me diga Bienvenido a la homePage y tengo otra pagina que es /pepe, ahi tambien lo va a hacer.

/////////////////////////////////////////////////////// MORGAN

// LOGGING MIDLEWARE. Funcion ==> tener un lugar donde logueo quien esta entrando al server, en que puerto, que es lo que quiere hacer. Para no tener que construir nosotros el logging middleware, vamos a utilizar MORGAN. A morgan le pasamos por parametro en que tipo de configuracion lo queremos utilizar.
// Voy a querer guardar todo el output del Logging Middleware en un archivo. write logs to a file. El flag a crea el archivo si no existe.
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

/////////////////////////////////////////////////////// NUNJUCKS
// Esto hace que res.render funcione con archivos html.
app.set("view engine", "html");
app.engine("html", nunjucks.render);
// Views ==> esto quiere decir vamos a ocupar la carpeta views. El cache se ocupa en las aplicaciones para que el server todo el tiempo no tenga que estar mandando lo mismo. Esto deshabilita eso para que el server si procese eso ya que estamos haciendo cambios constantemente.
nunjucks.configure("views", { noCache: true });

// Aca le estamos diciendo dentro de la carpeta views, vamos a renderizar el archivo index.html. En el segundo parametro, yo le voy a mandar la informacion que yo le voy a dar de comer en este index html
/* nunjucks.render('index.html', locals, function (err, output) {
  console.log(output);
}); */
app.use(routes);

// Para servir archivos estaticos (como estilos e imagenes) utilizamos express static. Es un middleware que resuelve todo por nosotros. En el primer parametro, aclaro un directorio donde quiero servir todos los archivos estaticos.
app.use(express.static("./public"));

app.listen(3000, () => {
  console.log("Escuchando en el puerto 3000...");
});