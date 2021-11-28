const chokidar = require('chokidar');
const { exec } = require("child_process");

// One-liner for current directory
chokidar.watch(['./json2html.js','./examples/landing'], {ignored: 'examples/landing/index.html'}).on('all', (event, path) => {
    console.log(event, path);
    exec('./test.sh')
});

exec('./test.sh');