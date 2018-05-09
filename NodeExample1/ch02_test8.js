let path = require('path')

let directories = ["users", "mike", "docs"]
let docs = directories.join(path.sep);
console.log(docs)

let curPath = path.join('Users/mike',"notepad.exe")
console.log(curPath)

let filename = "C:\\Users\\mike\\notepad.exe"
let dirname = path.dirname(filename);
let basename = path.basename(filename);
let extname = path.extname(filename);

console.log(`${dirname} ${basename} ${extname}`)