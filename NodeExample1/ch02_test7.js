let os = require('os')

console.log(os.hostname());
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.cpus());
console.log(`가나다 ${os.networkInterfaces()} `);
