var express = require('express');
var app = express();
var port = 9800;
var menu = [
    {link:"/",page:"Home"},
    {link:"/city",page:"City"},
    {link:"/hotel",page:"Hotel"}
]
var hotelRouter = require('./src/routes/hotelRoutes')(menu);
var cityRouter = require('./src/routes/cityRoutes')(menu);

//static file path
app.use(express.static(__dirname+'/public'));
//html
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    //res.send("Hii from express")
    res.render('index',{title:'Home Page',menu:menu})
});

app.use('/hotel',hotelRouter);
app.use('/city',cityRouter);

app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})