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
else {
    console.log("command not found.")
}
