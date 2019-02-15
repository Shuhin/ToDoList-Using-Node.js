let http = require('http');

let bodyParser = require('body-parser');

let {
  parse
} = require('querystring');

let data = [{
  item: 'get milk'
}, {
  item: 'get coffee'
}, {
  item: 'get sugar'
}];
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tododatabase'
});

connection.connect(function(error) {
  if (!!error) {
    console.log('Error');
  } else {
    console.log('Connected');
  }
});

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});


module.exports = function(app) {

    app.get('/todo', function(req, res) {
      connection.query("SELECT * FROM `Item`", function(error, rows) {
        if (!!error) {
          console.log('Error in the query');
        } else {
          console.log('Successful query');
          console.log(rows);
          data.push(rows)
          res.render('todo', {
            todos: data
          })
        }
      });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
      var a = data.push(req.body);
      let tokos = {
        Item: urlencodedParser
      }
      res.json(data);
      connection.query("INSERT INTO Item SET ?", tokos, function(error, data) {
        if (!!error) {
          console.log('Error in the query');
        } else {
          console.log('Successful query');
        }
      });
    });

    app.delete('/todo/:item', function(req, res) {
      data = data.filter(function(todo) {
        return todo.item.replace(/ /g, '-') !== req.params.item;
      });
      connection.query("DELETE FROM item WHERE Item = 'Buy Coffee'", function(error, rows) {
        if (!!error) {
          console.log('Error in the query');
        } else {
          console.log('Successful query');
          console.log(rows);
        }
      });
    });
  }
