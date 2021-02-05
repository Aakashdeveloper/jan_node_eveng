var express = require('express');
var axios = require('axios');
var redis = require('redis');
var app = express();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"
var port = 9800;

const client = redis.createClient({
    host:'localhost',
    port:6379
})

app.get('/data/:id',(req,res) => {
    const id = req.params.id;

    return client.get(id,(err,result) => {
        if(result){
            const output = JSON.parse(result);
            return res.send(output)
        }else{
            mongodb.connect(url,function(err,connection){
                if(err){
                  res.status(404).send('Error While Connecting')
                }else{
                  const dbo = connection.db('febnode');
                  dbo.collection('hotels').find({_id:id}).toArray(function(err,data){
                    if(err){
                      res.status(500).send('Error While Fetching')
                    }else{
                    client.setex(id, 3600, JSON.stringify({source:'Redis',data}));
                    return res.send({source:'mongodb',data})
                    }
                  })
                }
              })
        }
    })
})

app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
})