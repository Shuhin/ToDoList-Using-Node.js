var express = require('express');
var todoController = require('./controller/ControllerMongo');
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//fire controllers
todoController(app);

// localhost: 300/assets/styles.class
//  {
//   constructor() {
//
//   }
// }
app.listen(3000);
console.log('you are listening to port 3000');
