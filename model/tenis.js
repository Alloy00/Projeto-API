const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

let tenis = new Schema({
  id : {
    type: Number
  },
  name: {
    type: String
  },
  marca: {
    type: String
  },
  tamanho: {
    type: Number
  },
  nivel: {
    type: String
  }
},{
    collection: 'tenis'
});


tenis.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('tenis', tenis);