var os = require('os');
console.log(os.platform());
console.log(os.arch())
console.log(os.freemem()+' byte')
console.log(os.cpus())
console.log((os.cpus()).length)

console.log(os.uptime()+" sec")