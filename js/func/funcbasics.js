print = (x) => console.log(`${x}`)

const Box = x => 
({
ap: b2 => b2.map(x),
chain : f => f(x),
map: f => Box(f(x)),
fold: f => f(x),
inspect: () => `Box{${x}}`   
})

const add = x => y => x+y
//console.log(  add(2), 3)(x => x)

const res = Box(x => x+1).ap(Box(2))
console.log(res)

const LazyBox = g => 
({
//chain : f => f(x),=
map: f => LazyBox(() => f(g())),
fold: f => f(g()),
inspect: () => `Box{${x}}`   
})

 const result = LazyBox( ()=> '  65 ')
    .map(x => x.trim())
    .map(trimmed => new Number(trimmed))
    .map(num => num + 1)
    .map(x => String.fromCharCode(x))
    .fold(x => x.toLowerCase())

print(result)

const Task = require('data.Task')
const fs = require('fs');
const path = require('path')

const readFile = (filename, enc) => 
    new Task((rej,res)=>
    fs.readFile(filename, enc, 
    (err, cnt) => err ? rej(err) :res(cnt))
    );

const writeFile = (filename, cnt) => 
    new Task((rej,res)=>
    fs.writeFile(filename, cnt, 
    (err, success) => err ? rej(err) :res(success))
    );
    


//console.log(path.resolve(__dirname, 'config.json'))
const app = () =>
    readFile('./config.json')
    .map(x => x + "DDDD")
    .chain(x => writeFile('./config.json', x))

 app() .fork(e => console.log(e), s => console.log('success'))
