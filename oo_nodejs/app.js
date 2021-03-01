import express from 'express';
const app = express();
const port = 8700;
import database from './database';

app.get('/getData',(req,res) => {
    let output = database.getData('users');
    res.send(output)
})

app.post('addData',(req,res) =>{
    var mydata = {"Name":"Abc"}
    let output = database.postData('users',mydata)
    res.send(output)
})

app.listen(port);