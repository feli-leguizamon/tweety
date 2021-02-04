// LODASH es una libreria muy util para lo que es programacion funcional. Provee una larga lista de funciones muy utiles de JS.
const _ = require("lodash");
// Aca es donde voy a guardar mis tweets. Los tweets van a tener un autor y un tweet.
const data = [];

// Funcion para agregar un tweet.
function add(name, content) {
  data.push({ id: data.length, name, content });
}

//Funcion que me va a devolver una lista de todos los tweets. cloneDeep va a hacer un clonado de data y va a devolver eso. La diferencia entre clone y cloneDeep es que clone mantiene las referencias. Lo malo de mantener las referencias es que si alguien te cambia algo en el array original eso te va a cambiar tambien en el otro array y viceversa porque los dos apuntan al mismo lugar de referencia.
/* Ejemplo cloneDeep: 
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false

Ejemplo clone: 
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true
*/
function list() {
    return _.cloneDeep(data);
}

//Funcion que va a recibir unas propeidades y finalmente voy a encontrar dentro de data los tweets ya sea por nombre de autor o por algo que se me ocurra buscar dentro de la lista de tweets.
function find(properties) {
    return _.cloneDeep(_.filter(data, properties));
}


// La data no la exporto por temas de seguridad, no la quiero exponer.
module.exports = { add, list, find };

// Esta funcion genera un array random.
const randArrayEl = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function () {
  const fakeFirsts = [
    "Toni",
    "Guille",
    "Santi",
    "Facu",
    "Alan",
    "Pinki",
    "Tincho",
    "Solano",
    "R2D2",
  ];
  const fakeLasts = [
    "Scanlan",
    "Aszyn",
    "Tralice",
    "Velasco",
    "Sainz",
    "Palacio",
    "Palacios",
    "Lidueña",
    "Fisicaro",
    "Ecma",
  ];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function () {
  const awesome_adj = [
    "increible",
    "emocionante",
    "increible",
    "gracioso",
    "dulce",
    "cool",
    "sorprendente",
    "impresionante",
  ];
  return (
    "Plataforma 5 es " +
    randArrayEl(awesome_adj) +
    "! Los profesores simplemente son " +
    randArrayEl(awesome_adj) +
    ". #P5Love #codedreams"
  );
};

//Las dos funciones de arriba una me da un nombre falso y otra un tweet falso. Hago un for para no tener que escribir diez veces la misma linea de un module.exports.add con un nombre y un fake tweet. 
for (let i = 0; i < 10; i++) {
  module.exports.add(getFakeName(), getFakeTweet());
}
