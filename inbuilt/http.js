var http = require('http');
var server = http.createServer(function(req,res){
    res.write('<h1>Welcome to Node JS Server</h1>');
    res.end()
})

server.listen(8777);