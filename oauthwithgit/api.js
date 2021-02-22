const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 9800;

app.get('/',(req,res)=> {
    res.send("<a href='https://github.com/login/oauth/authorize?client_id=a509983d532b0f8320f1'>Login With GIt</a>")
})

app.get('/user',(req,res) =>{
    const code = req.query.code;
    if(!code){
        res.send({
            success:false
        })
    }

    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'a509983d532b0f8320f1',
            client_secret:'0795a031e1a76e8a5b006209d1f6a9e7d5ad13ed',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) =>{
            if(err) throw err;
            var acctoken = result.body.access_token
            const option={
                url:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':'token '+acctoken,
                    'User-Agent':'mycode'
                }
            }
            var output;
            request(option,(err,response,body) => {
                output = body;
                return res.send(output)
            })
        })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})