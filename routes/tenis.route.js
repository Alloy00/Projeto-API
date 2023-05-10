const express = require('express');
const app = express();
const tenisRoutes = express.Router();

let tenis = require('../model/tenis');

// api to add tenis
tenisRoutes.route('/add').post(function (req, res) {
  let novoTenis = new tenis(req.body);
  novoTenis.save()
  .then(tenis => {
    res.status(200).json({'status': 'success','mssg': 'tenis added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});


// api to get tenis
tenisRoutes.route('/').get(function (req, res) {
  tenis.find(function (err, tenis){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','tenis': tenis});
    }
  });
});

// api to get tenis
tenisRoutes.route('/tenis/:id').get(function (req, res) {
  let id = req.params.id;
  tenis.findById(id, function (err, tenis){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','tenis': tenis});
    }
  });
});

// api to update route
tenisRoutes.route('/update/:id').put(function (req, res) {
    tenis.findById(req.params.id, function(err, tenis) {
    if (!tenis){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        tenis.name = req.body.name;
        tenis.marca = req.body.marca;
        tenis.tamanho = req.body.tamanho;
        tenis.nivel = req.body.nivel;

        tenis.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
tenisRoutes.route('/delete/:id').delete(function (req, res) {
  tenis.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

// api to get tenis by name
tenisRoutes.route('/tenis/:name').get(function (req, res) {
  let name = req.params.name;
  tenis.findOne({ name: name }, function (err, tenis){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else if (!tenis) {
      res.status(404).send({'status': 'failure','mssg': 'Tenis not found'});
    }
    else {
      res.status(200).json({'status': 'success','tenis': tenis});
    }
  });
});


module.exports = tenisRoutes;