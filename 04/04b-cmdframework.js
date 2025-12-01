let inputs = process.argv.slice(3);
let command = process.argv[2];

console.log("command is:", command);
console.log("inputs are:", inputs);
console.log("------------------------");
let controllers = [];
function start(){
    let found = false;
    for(let item of controllers){
        if(item.command === command){
            item.func(inputs);
            found = true;
            break;
        }
    }
    if(! found){
        console.log('command not found.')
    }
}

function use(command , func)
{
    let item = {
        command : command,
        func : func
    };
    controllers.push(item);

    console.log('--------------',controllers)
}

export{
    start,
    use
}