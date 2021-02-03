var express = require('express');
var hotelRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

function router(menu){
  hotelRouter.route('/')
    .get((req,res) => {
        //res.send(hotels)
        mongodb.connect(url,function(err,connection){
          if(err){
            res.status(404).send('Error While Connecting')
          }else{
            const dbo = connection.db('febnode');
            dbo.collection('hotels').find({}).toArray(function(err,data){
              if(err){
                res.status(500).send('Error While Fetching')
              }else{
                res.render('hotels',{title:'Hotel Page',data:data,menu:menu})
              }
            })
          }
        })
    })

  hotelRouter.route('/details/:id')
    .get((req,res) => {
        //var id= req.params.id;
        var {id} = req.params
        mongodb.connect(url,function(err,connection){
          if(err){
            res.status(404).send('Error While Connecting')
          }else{
            const dbo = connection.db('febnode');
            dbo.collection('hotels').find({_id:id}).toArray(function(err,data){
              if(err){
                res.status(500).send('Error While Fetching')
              }else{
                res.render('hotelDetail',{title:'Hotel Detail Page',data:data,menu:menu})
              }
            })
          }
        })
       
    })
  
  return hotelRouter
}
module.exports = router