import fs from "fs";
import {use, start, write} from "./05b-httpFramework.js";
import {readFile, writeFile} from "fs";

use("index.html", function(request, response){
    response.write(`
        <html>
            <head>
                <title>hello!</title>
            </head>
            <body>
                <b>Hello!</b>
                <img src='http://127.0.0.1/file/x.jpg'>
            </body>
        </html>
    `);
    response.end();
});


use("file", function(request, response){
    let urlArray = request.url.split('/');
    let fileName = urlArray[2];

    readFile(fileName, function(error, fileBody){
        if(error){
            let message = 'file server error:' + error;
            console.log(message);
            // response.writeHead(404);
            // response.write(message);
            // response.end();
            write(response, 404, message);    
        }
        else{
            // response.writeHead(200);
            // response.write(fileBody);
            // response.end();
            write(response, 200, fileBody);            
        }
    })
});
use("sum",function(request,response){
    let urlArray = request.url.split('/');
    let inputs = urlArray.slice(2);
    // console.log('urlArray',urlArray);
    // console.log('inputs',inputs);
    write(response, 200, 'sum: ' + (parseInt(inputs[0])+parseInt(inputs[1])));
})


use("createFille", function(request, response) {
    const urlArray = request.url.split('/');
    const inputs = urlArray.slice(2);

    const filename = inputs[0];
    const content = inputs.slice(1).join('/');  

    if (!filename) {
        write(response, 400, "no filename provided");
        return;
    }

    fs.writeFile(filename, content, function(err) {
        if (err) {
            write(response, 500, "error creating file: " + err.message);
        } else {
            write(response, 200, "file created: " + filename + " with content: " + content);
        }
    });
});



start();

