let fs = require('fs');
let inputs = process.argv.slice(3);
let command = process.argv[2];

console.log("command is:", command);
console.log("inputs are:", inputs);
console.log("------------------------");

if(command == "sum"){
    console.log(Number(inputs[0]) + Number(inputs[1]));
}
else if(command == "minus"){
    console.log(Number(inputs[0]) - Number(inputs[1]));
}
else if(command == "print"){
    let obj = {
        name: inputs[0],
        family: inputs[1],
        age: inputs[2]
    }
 
    // let obj = {};
    // obj['name'] = inputs[0];
    // obj['family'] = inputs[1];
    // obj['age'] = inputs[2];

    console.log("your object is:", obj);

}
else if(command == "print2"){
    let obj = {
        name: inputs[0],
        family: inputs[1],
        age: inputs[2]
    }
 
    for(let key in obj){
        console.log('salam', obj[key]);
    }

}
else if (command =="print3"){
    let text='salam';
    xxx(text);
}
else if (command =="print4"){
    let text='salam';
    console.log(yyy(text));
}
else if (command =="write"){
    let body= yyy('salam');

    console.log('a', typeof body, body);
    body = JSON.stringify(body);
    console.log("b", typeof body, body);

    fs.writeFile('./data.txt',body, function(err){
        if(err){
            console.log('file NOT saved.');
        }
        else{
                console.log('file saved.');
        }
    });
}
else if (command =="read"){
    fs.readFile('./data.txt', {encoding: 'utf8'}, function(err,body){
        if(err){
            console.log('read erorr.');
        }
        else{
                console.log('file opeen: ', body);
        }
    });
}
else if (command =="append"){
    fs.appendFile('./data.txt',inputs[0],function(err){
        if(err){
            console.log('can not append to fill');
        }
        else{
            console.log('append your text to file');
        }
    })
}
else if(command === 'createRecord'){
    let obj = {
        name : inputs[0],
        family: inputs[1],
        email:inputs[2]
    }
        fs.readFile('./data.json', {encoding: 'utf8'}, function(err,body){
            if(err){
                if(err.code==='ENOENT'){
                    console.log("file not found");
                }
                else{
                    console.log('read error',err);
                }
            }
            else{
                    console.log('file opeen: ', body);

                    body = JSON.parse(body);
                    body.records.push(obj);
                    body = JSON.stringify(body);

                    fs.writeFile('./data.json',body,function(err){
                        if(err){
                            console.log('err',err);
                        }
                        else{
                            console.log('createRecord done');
                        }
                    })

            }
        });
}
else {
    console.log("command not found.")
}


function xxx(salam){
    let obj = {
        name: inputs[0],
        family: inputs[1],
        age: inputs[2]
    }

    for(let key in obj){
        console.log(salam, obj[key]);
    }
}

function yyy(salam){
    let obj = {
        name: inputs[0],
        family: inputs[1],
        age: inputs[2]
    }

    let newObj = {};
    for(let key in obj){
        newObj[key] = salam + ' ' + obj[key];
    }
    return newObj;
}
