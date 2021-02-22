const express = require('express');
const app = express();
const port = process.env.PORT ||9007;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl="mongodb://localhost:27017";
let db;
let col_name="users";

app.use(cors());
//parse data for post call
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

//health Check
app.get('/health',(req,res) => {
    res.status(200).send("Health OK")
});


app.get('/',(req,res) => {
    db.collection(col_name).find().toArray((err,result) => {
        if(err) throw err;
        res.render('index',{data:result})
    })
});

app.get('/new',(req,res) => {
    res.render('admin')
})

//postUser
app.post('/addUser',(req,res) => {
    console.log(req.body);
    var data = {
        "name": req.body.name,
        "city": req.body.city,
        "phone": req.body.phone,
        "isActive": req.body.isActive?req.body.isActive:true,
        "role": req.body.role?req.body.role:'User',
        "email": req.body.email
    }
    db.collection(col_name).insert(data,(err,result) =>{
        if(err) throw err;
        res.redirect('/')
    })
})

//getUser
app.get('/users',(req,res) => {
    var query = {}
    if(req.query.city && req.query.role){
        query={city:req.query.city,role:req.query.role,isActive:true}
    }
    else if(req.query.city){
        query={city:req.query.city,isActive:true}
    }else if(req.query.role){
        query={role:req.query.role,isActive:true}
    }
    else{
        let isAct;
        if(req.query.isActive=="false"){
            isAct= false
        }else{
            isAct= true
        }
        query={isActive:req.query.isActive?isAct:true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//updatUser
app.put('/updateUser',(req,res) => {
    let id = req.body._id;
    db.collection(col_name).update(
        {_id:mongo.ObjectID(id)},
        {
            $set:{
                name: req.body.name,
                city: req.body.city,
                phone: req.body.phone,
                isActive: req.body.isActive?req.body.isActive:true,
                role: req.body.role,
                email: req.body.email
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Data Updated')
        }
    )
})

//harddelete
app.delete('/deleteUser',(req,res) => {
    let Id = mongo.ObjectID(req.body._id);
    //let Id = Number(req.body._id);
    db.collection(col_name).remove({_id:Id},(err,result) =>{
        if(err) throw err;
        res.send("Data Deleted")
    })
})

//deactivate(soft delete)
app.put('/deactivateUser',(req,res) => {
    console.log("deactivateUser>>>>",req.body._id)
    let id = req.body._id;
    db.collection(col_name).update(
        {_id:mongo.ObjectID(id)},
        {
            $set:{
                isActive: false
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Deactivated')
        }
    )
})
//activate
app.put('/activateUser',(req,res) => {
    let id = req.body._id;
    db.collection(col_name).update(
        {_id:mongo.ObjectID(id)},
        {
            $set:{
                isActive: true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User activated')
        }
    )
})

//getProfile
app.get('/user/:id',(req,res)=>{
    console.log("req.params.id>>",req.params.id)
    var id = mongo.ObjectID(req.params.id)
    var query = {}
    query ={_id:id}
    db.collection(col_name).findOne(query,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//connect with db
MongoClient.connect(mongourl,(err,connection)=>{
    if(err) console.log(err);
    db=connection.db('febnode');
});

//Start server
app.listen(port,(err)=> {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})