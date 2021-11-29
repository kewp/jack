const chokidar = require('chokidar');
const readline = require('readline');
const fs = require('fs');
const http = require('http');

let file = './examples/landing/landing.json';
let temp = './examples/landing';
let outf = './tmp/index.html';

if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');

let live = `
<script>
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')
</script>
`

let str = ''; // sent to server
let run = () => {
    
    console.log();

    try { str = require('./jack').get_file_str(file,temp); }
    catch (err) { console.log(`could not run jack: ${err}`); return; }
    
    // insert live reload script
    if (str.indexOf('</body>')>-1) str = str.replace('</body>',live+'</body>');
    else str += live;

    console.log(timestamp(), 'run successful');
    fs.writeFileSync(outf, str);
}

let timestamp = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `[${hours}:${minutes}:${seconds}]`;
}

// One-liner for current directory
chokidar.watch(['./jack.js',temp]).on('all', (event, path) => {
        console.log(timestamp(), event, path);
        if (event != 'add' && event != 'addDir')
        {
            if (path=='jack.js') delete require.cache[require.resolve('./jack')];
            run();
        }
        readline.cursorTo(process.stdout, 0);
});

run();

let port = '8000';

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(str);
}).listen(port);

// const { createServer } = require('vite')

// ;(async () => {
//   const server = await createServer({
//     // any valid user config options, plus `mode` and `configFile`
//     configFile: false,
//     root: 'tmp',
//     server: {
//       port: 1337
//     }
//   })
//   await server.listen()

//   server.printUrls()
// })()

require('livereload').createServer().watch(__dirname + "/tmp");