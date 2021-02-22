const express = require('express');
const router = express.Router();
const bodyParser =  require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userModel');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/users',(req,res) =>{
    User.find({},(err,data) => {
        res.send(data)
    })
})

//register
router.post('/register',(req,res) => {
    var hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        password:hashpassword,
        email:req.body.email,
        role:req.body.role?req.body.role:'User'
    },(err,user) => {
        if(err) return res.status(500).send("Error")
        res.send('Register Success')
    })
})

// login
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send("Error")
        if(!user) res.status(500).send("No user found")
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passIsValid) res.status(401).send("Invalid password");
            var token = jwt.sign({id:user._id},config.secert,{expiresIn:7200})
            res.send({auth:true,token:token})
        }
    })
})

//user info
router.get('/userInfo',(req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No token provided'})
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.status(500).send("Error")
        User.findById(data.id,{password:0},(err,result) => {
            res.send(result)
        })
    })
})
module.exports = router;