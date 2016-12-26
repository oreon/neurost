
const Task = require('data.Task')
const futurize = require('futurize').futurize(Task)
const  { List } = require('immutable-ext');
const fs = require('fs');

const readFile = futurize(fs.readFile);
const files = List.of(['config.json', 'readdb.js'])
const logTask = (task) => task.fork(console.error, console.log)

const res = files.traverse(Task.of, filnm => readFile(filnm))
logTask(res)

const Db = ({
    find: id => new Task((rej, res) =>
        setTimeout(()  => res({id: id, title:`Proj ${id}`}), 100))
})

const reportHeader = (p1, p2) =>  (
     `${p1.title} --- ${p2.title}`)

Task.of(p1 => p2 => reportHeader(p1, p2))
.ap(Db.find(20))
.ap(Db.find(10))
.fork(console.error , console.log)




