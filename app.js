var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(' mongodb://127.0.0.1:27017', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});


const tenisRoutes = require('./routes/tenis.route');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());


app.use('/tenis', tenisRoutes);
app.get('/', function(req, res){
   res.send("Hello World!");
});
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});
app.get('/remove', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/remove.html'));
});
app.get('/update', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/update.html'));
});


app.listen(3000,function(){
    console.log('Listening on port 3000!');
});