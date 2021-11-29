let { existsSync, readFile, writeFileSync, readFileSync } = require('fs');
let path = require('path');

function typestr(obj) { return Object.prototype.toString.call(obj); }
function is_array(obj) { return typestr(obj) == '[object Array]'; }
function is_object(obj) { return typestr(obj) == '[object Object]'; }
function is_string(obj) { return typestr(obj) == '[object String]'; }

function fail(str) { throw new Error(str); /* process.exit(1); */ }

function get_str(name, temp, obj)
{
    console.trace('temp',temp);
    let ret = readFileSync(path.join(temp, name)+'.html');

    if (ret.indexOf('{slot}') == -1)
        fail(`{slot} not found in ${name}.html`);
    if (is_string(obj)) 
        ret = ret.replace('{slot}',obj);
    else
        ret = ret.replace('{slot}',get_str(obj));

    return ret;
}


function get_str(obj, temp, outp)
{
    let str = 'hellos';

    if (is_object(obj))
    {
        Object.keys(obj).forEach(name => {

        })

    }
    else if (is_array(obj))
    {
    }
    else throw new Error('bad type: '+typestr(obj));

    return str;
}

//     if (!is_object(obj)) console.log('root json must be an object');
//     else {
//         let out = "";
//         let err = false;
//         Object.keys(obj).forEach(name => {
//             let fname = path.join(temp, name)
//             if (!existsSync(`${fname}.html`))
//             {
//                 console.log(`could not find ${fname}.html`)
//                 err = true;
//             }
//             else
//                 out += get_str(name, temp, obj[name]);
//         })
//         if (err) return;
//         try { writeFileSync(outp, out); }
//         catch (err) { fail(err); }
//     }
// }

function get_file_str(file, tmp)
{
    let data;
    try { data = readFileSync(file); }
    catch (err) { console.log('could not open file'); console.log(err.stack); return ''; }

    let obj;
    try { obj = JSON.parse(data); }
    catch (err) { console.log('could not parse json'); console.log(err.stack); return ''; }
    
    let str;
    try { str = get_str(obj); }
    catch (err) { console.log('could not get json string'); console.log(err.stack); return ''; }

    return str;
}

function go(file, temp, outp)
{
    readFile(file, 'utf8', (err, data) => {

        if (err) {
            console.log(`error reading file from disk: ${err}`);
        } else {
    
            let obj; try { obj = JSON.parse(data); }
            catch (err) {
                console.log(`could not parse json`);
                console.log(err.stack);
                return;
            }
            let str; try { str = get_str(obj); }
            catch (err) {
                console.log('could not get json string');
                console.log(err.stack);
                return;
            }
            writeFileSync(outp, str);
        }

    });
}

function go_check(conf)
{
    let { base, file, temp, outp, rela } = conf;

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

if (require.main === module) {

    var argv = require('yargs/yargs')(process.argv.slice(2))
        .default('b','./')
        .demandCommand(0,0)
        .describe('b','base directory')
        .describe('t','template directory (relative to root)')
        .default('t','./')
        .default('f','main.json')
        .describe('f','input json file (relative to root)')
        .default('o','index.html')
        .describe('o','output html')
        .boolean('O')
        .default('O',false)
        .describe('O','output html relative to root')
        .strict()
        .argv;

    // console.log(`running with -b ${argv.b} -f ${argv.f} -t ${argv.t} [run with --help for more]`);

    let conf = {
        base: argv.b,
        file: argv.f,
        temp: argv.t,
        outp: argv.o,
        rela: argv.O
    };

    go_check(conf);
}

module.exports = {go_check, get_file_str};