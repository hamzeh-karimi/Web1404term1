import {createServer} from "http";

let controllers = [];

function start() {

    let myServer = createServer(function (request, response) {

        console.log("----------------------")
        console.log("request:", request.method, request.url);

        let body = '';
        request.on("data", function(chunk){
            body += chunk;
        });

        request.on("end", function(){
            try{
                body = JSON.parse(body);
            }
            catch(e){
                console.log("warning: request body is not a valid JSON.")
            }
            request.body = body;
            router(request, response);
        });
    });

    myServer.listen(80);
}

function router(request, response){
    let found = false;
    for (let item of controllers) {
        //if ("/" + item.path === request.url) {
        if (request.url.startsWith("/" + item.path) && request.method === item.method) {
            console.log("router ok:  ", request.url);
            item.func(request, response);
            found = true;
        }
    }
    if (!found) {
        let message = 'router fail: ' + request.url;
        console.log(message);
        write(response, 404, message)
    }
}

function use(method,path, func) {
    let item = {
        method:method,
        path: path,
        func: func
    };
    controllers.push(item);
}

function write(response, code, body, header){
    if(header){
        response.writeHead(code, header);
    }
    else{
        response.writeHead(code);
    }
    response.write(body);
    response.end();
}

export {
    start,
    use,
    write
}