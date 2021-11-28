let { existsSync, readFile, writeFileSync, readFileSync } = require('fs');
let path = require('path');

function typestr(obj) { return Object.prototype.toString.call(obj); }
function is_array(obj) { return typestr(obj) == '[object Array]'; }
function is_object(obj) { return typestr(obj) == '[object Object]'; }

function fail(str) { console.log(str); process.exit(1); }

function get_str(name, temp, obj)
{
    let ret;
    try {
        ret = readFileSync(path.join(temp, name)+'.html')
    }
    catch (err) { fail(err); }
    return ret;
}

function go_root_json(obj, temp, outp)
{
    if (!is_object(obj)) console.log('root json must be an object');
    else {
        let out = "";
        let err = false;
        Object.keys(obj).forEach(name => {
            let fname = path.join(temp, name)
            if (!existsSync(`${fname}.html`))
            {
                console.log(`could not find ${fname}.html`)
                err = true;
            }
            else
                out += get_str(name, temp, obj[name]);
        })
        if (err) return;
        try { writeFileSync(outp, out); }
        catch (err) { fail(err); }
    }
}

function go(file, temp, outp)
{
    readFile(file, 'utf8', (err, data) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
    
            try {
                // parse JSON string to JSON object
                const obj = JSON.parse(data);
                go_root_json(obj, temp, outp);
            }
            catch (err) {
                console.log(`Could not parse json: ${err}`);
            }
        }

    });
}

function go_check(base, file, temp, outp, rela)
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
            {
                outp = rela ? path.join(base, outp) : outp;
                go(file, temp, outp);
            }
        }
    }
}

var argv = require('yargs/yargs')(process.argv.slice(2))
    .default('b','./')
    .demandCommand(0,0)
    .describe('b','Base directory')
    .describe('t','Template directory (relative to base)')
    .default('t','./')
    .default('f','main.json')
    .describe('f','Input json file (relative to base)')
    .default('o','index.html')
    .describe('o','Output html')
    .boolean('O')
    .default('O',false)
    .describe('O','Output html relative to base')
    .strict()
    .argv;

// console.log(`running with -b ${argv.b} -f ${argv.f} -t ${argv.t} [run with --help for more]`);

go_check(argv.b, argv.f, argv.t, argv.o, argv.O);