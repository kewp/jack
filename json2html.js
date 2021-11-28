let { existsSync, readFile } = require('fs');
let path = require('path');

function typestr(obj) { return Object.prototype.toString.call(obj); }
function is_array(obj) { return typestr(obj) == '[object Array]'; }
function is_object(obj) { return typestr(obj) == '[object Object]'; }

function go_main_json(obj, temp)
{
    if (!is_object(obj)) console.log('Main json must be object');
    else {
        Object.keys(obj).forEach(name => {
            let fname = path.join(temp, name)
            if (!existsSync(`${fname}.html`))
                console.log(`could not find ${fname}.html`)
        })
    }
}

function go(file, temp)
{
    readFile(file, 'utf8', (err, data) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
    
            try {
                // parse JSON string to JSON object
                const obj = JSON.parse(data);
                go_main_json(obj, temp);
            }
            catch (err) {
                console.log(`Could not parse json: ${err}`);
            }
        }
    
    });
}

function go_check(base, file, temp)
{
    if (!existsSync(base))
        console.log(`error: ${base} not found`);
    else {
        file = path.join(base, file)
        if (!existsSync(file))
            console.log(`error: ${file} not found`);
        else {
            temp = path.join(base, temp)
            if (!existsSync(temp))
                console.log(`error: ${temp} not found`);
            else
                go(file, temp);
        }
    }
}

var argv = require('yargs/yargs')(process.argv.slice(2))
    // .usage('Usage: $0 [opts] [json]')
    .default('b','./')
    .demandCommand(0,0)
    .describe('b','Base directory')
    .describe('t','Template directory (relative to base)')
    .default('t','./')
    .default('f','main.json')
    .describe('f','Input json file (relative to base)')
    .strict()
    .argv;

// console.log(`running with -b ${argv.b} -f ${argv.f} -t ${argv.t} [run with --help for more]`);

go_check(argv.b, argv.f, argv.t);