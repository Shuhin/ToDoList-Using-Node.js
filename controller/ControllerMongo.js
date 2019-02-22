let mongoose = require('mongoose');
let bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/tododatabase' , (err,db)=>{
  if(err){
    return console.log('Unable to Connect');
  }
  console.log('Connected');
});// connecting database

// creating a blueprint how the database will expect data

var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item : 'Get Flowers'}).save(function(err){
//   if (err) throw err;
//   console.log ('item saved');
// });

var urlencodedParser = bodyParser.urlencoded({extended : false});

module.exports = function(app) {

    app.get('/todo', function(req, res) {
      Todo.find({}, function(err,data){
        if(err) throw err;
        res.render('todo',{todos: data});
      });
    });


    app.post('/todo', urlencodedParser, function(req, res) {

      var newTodo= Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
      });
    });


    app.delete('/todo/:item', function(req, res) {
      Todo.find({ item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data) {
        if (err) throw err;
        res.json(data);
      });
    });
}
