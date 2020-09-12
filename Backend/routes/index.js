var express = require('express');
var router = express.Router();
const Questions = require('../models/Questions');

router.route('/').get(function(req,res){
  Questions.find(function(err,data){
    if(err){
      res.json(err)
    }else{
      res.json(data)
    }
  })
})

router.route('/add').post(function(req,res){
  const question = new Questions(req.body);
  question.save()
  .then(()=>{
    console.log('Added')
    res.json(question)
  })
  .catch((err)=>{
    res.json(err)
  })
})

router.route('/search').post(function(req,res){
  console.log(req.body)
  Questions.find({$text:{$search:req.body.tags}},function(err,data){
    if(err){
      res.json(err)
    }else{
      res.json(data)
    }
  })
})

module.exports = router;
