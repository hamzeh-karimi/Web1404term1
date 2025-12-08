import { createServer } from "http";
let controls = [];

function start() {

    let myServer = createServer(function(request,response){
        let found = false;
    for (let item of controls) {
        if ("/"+item.path == request.url) {
            item.func(request,response);
            found = true;
        }
        
    }if (!found) {
            console.log("controler not found");
        }

});

myServer.listen(80);


    
}


function use(path,func){
    let item ={
        path:path,
        func:func
    }
    controls.push(item);
}

export{
    start,
    use
}