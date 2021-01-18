var fs = require('fs');

/*fs.writeFile('mytext.txt','Ind Vs NZ Match',function(err){
    if(err) throw err;
    console.log("Task Done")
})


fs.appendFile('myfile.txt','This is from NodeJs \n',function(err){
    if(err) throw err;
    console.log("Append Done")
})
*/

fs.readFile('myfile.txt','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})
