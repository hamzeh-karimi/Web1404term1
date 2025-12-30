import { use, start, write } from "./08a-httpFramework.js";
import { readFile, writeFile } from "fs";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";

const SECRET = 'jhgjhgjkhgjhuygiuhio';
const LOGIN_TIME = 1; //min

function verifyToken(token) {
    try {
        let plain = jwt.verify(token, SECRET);
        if ((Date.now() / 1000 - plain.iat) < LOGIN_TIME * 60) {
            return true;
        }
        else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

function parseCookie(cookieString, name) {
    let cookies = '';
    try {
        cookies = cookieString.split('; ');
    }
    catch (e) {
        return '';
    }
    for (let cookie of cookies) {
        let splitted = cookie.split('=');
        if (splitted[0] === name) {
            return splitted[1];
        }
    }
}

use('GET', "index.html", function (request, response) {
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

use('GET', "file", function (request, response) {
    let urlArray = request.url.split('/');
    let fileName = urlArray[2];

    readFile(fileName, function (error, fileBody) {
        if (error) {
            let message = 'file server error:' + error;
            console.log(message);
            // response.writeHead(404);
            // response.write(message);
            // response.end();
            write(response, 404, message);
        }
        else {
            // response.writeHead(200);
            // response.write(fileBody);
            // response.end();
            write(response, 200, fileBody);
        }
    })
});

use('GET', "hello", function (request, response) {
    let urlArray = request.url.split('/');
    let inputs = urlArray.slice(2);
    // console.log('urlArray', urlArray);
    // console.log('inputs', inputs);

    write(response, 200, JSON.stringify({ x: "hello" + inputs[0] }));
})

use('GET', "sum", function (request, response) {
    if (!verifyToken(parseCookie(request.headers.cookie, 'token'))) {
        write(response, 400, "invalid token.");
    }
    else {
        let urlArray = request.url.split('/');
        let inputs = urlArray.slice(2);
        write(response, 200, 'sum: ' + (parseInt(inputs[0]) + parseInt(inputs[1])));
    }
});
use('GET', "publicSum", function (request, response) {

    let urlArray = request.url.split('/');
    let inputs = urlArray.slice(2);
    write(response, 200, 'sum: ' + (parseInt(inputs[0]) + parseInt(inputs[1])));
});

use('GET', "createFile", createFile);
use('POST', "createFile", createFile);
function createFile(request, response) {
    let urlArray = request.url.split('/');
    let inputs = urlArray.slice(2);
    let body = inputs[1] || '';

    writeFile('./' + inputs[0], body, function (err) {
        if (err) {
            let message = 'createFile error:' + error;
            console.log(message);
            write(response, 500, message);
        }
        else {
            write(response, 200, 'createFile ok');
        }
    })
}

use("POST", "postTest", function (request, response) {
    console.log('body: ', typeof request.body, request.body)
});

use("POST", "signup", signup);


function signup(request, response) {
    readFile('./users.json', { encoding: 'utf8' }, function (err, fileBody) {
        if (err) {
            if (err.code === 'ENOENT') {
                let msg = 'read error: File not found';
                console.log(msg);
                write(response, 500, msg);
            }
            else {
                let msg = 'read error:' + err;
                console.log(msg);
                write(response, 500, msg);
            }
        }
        else {
            fileBody = JSON.parse(fileBody);
            fileBody.records.push(request.body);
            fileBody = JSON.stringify(fileBody);

            writeFile('./users.json', fileBody, function (err) {
                if (err) {
                    let msg = 'writeFile error:' + err;
                    console.log(msg);
                    write(response, 500, msg);
                }
                else {
                    console.log('signup done.');
                    write(response, 200, 'signup done.');
                }
            });
        }
    });
}

use("POST", "login", function (request, response) {
    readFile('./users.json', { encoding: 'utf8' }, function (err, fileBody) {
        if (err) {
            if (err.code === 'ENOENT') {
                let msg = 'read error: File not found';
                console.log(msg);
                write(response, 500, msg);
            }
            else {
                let msg = 'read error:' + err;
                console.log(msg);
                write(response, 500, msg);
            }
        }
        else {
            fileBody = JSON.parse(fileBody);
            let found = false;
            for (let i = 0; i < fileBody.records.length; i++) {
                if (fileBody.records[i].user === request.body.user && fileBody.records[i].pass === request.body.pass) {
                    found = true;
                    break;
                }
            }

            if (found) {
                let userData = {
                    user: request.body.user
                };
                let token = jwt.sign(userData, SECRET);
                write(response, 200, 'login done', {
                    'Set-Cookie': 'token=' + token
                });
            }
            else {
                write(response, 404, 'login failed.');
            }
        }
    });
});

start();
