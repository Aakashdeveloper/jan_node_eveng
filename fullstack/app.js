var express = require('express');
var app = express();
var port = 9800;
var hotelRouter = require('./src/routes/hotelRoutes');
var cityRouter = require('./src/routes/cityRoutes');

//static file path
app.use(express.static(__dirname+'/public'));
//html
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    //res.send("Hii from express")
    res.render('index')
});

app.use('/hotel',hotelRouter);
app.use('/city',cityRouter);

app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})