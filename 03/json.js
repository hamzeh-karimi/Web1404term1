let x ={
    a:1,
    b:2
};

console.log(typeof x, x);
x=JSON.stringify(x);
console.log(typeof x, x);
x= JSON.parse(x);
console.log(typeof x, x);