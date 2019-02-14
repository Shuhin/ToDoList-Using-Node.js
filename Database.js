var http = require ('http');

var bodyParser = require('body-parser');
//var mangoose = require('mangoose');

var data = [{item: 'get milk'}, {item: 'get coffee'}, {item: 'get sugar'}]

var mysql= require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todoDB'
});

connection.connect(function(error){
  if(!!error) {
    console.log('Error');
  } else {
    console.log('Connected');
  }
});

var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

  app.get('/todo', function(req, res){
      connection.query("SELECT Item FROM todo" , function(error, results){
        if(!!error) {
          console.log ('Error in the query');
        } else {
          console.log('Successful query');
          console.log(results);
          res.render('todo', {todos: data})
        }
      });
  });

  app.post('/todo', urlencodedParser, function(req, res){
     // //ar Ite = data.push(req.body);
     //  connection.query("INSERT INTO todo (ItemNo , Item) VALUES (1, 'buy flower')" , function(error, data){
     //     if(!!error) {
     //       console.log ('Error in the query');
     //     } else {
     //       console.log('Successful query');
     //       res.json(data);
     //     }
     data.push(req.body);
     res.json(data);
     });

  app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data)
  });
};
