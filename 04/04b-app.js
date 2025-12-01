import {use , start} from "./04b-cmdframework.js";
import { readFile , writeFile } from "fs";

use("createrecord", function(x){
            let obj = {
        name: x[0],
        family: x[1],
        email: x[2]
    }
    readFile('./data.json', {encoding: 'utf8'}, function(err, body){
        if(err){
            if(err.code === 'ENOENT'){
                console.log('read error: File not found');
            }
            else{
                console.log('read error:', err);
            }
        }
        else{
            body = JSON.parse(body);
            body.records.push(obj);
            body = JSON.stringify(body);

            writeFile('./data.json', body, function(err){
                if(err){
                    console.log('err', err);
                }
                else{
                    console.log('createRecord done.');
                }
            });
        }
    });
        }
    );

    use("updaterecord", function(x){
        console.log(0);
                    let obj = {
            name: x[1],
            family: x[2],
            email: x[3]
        }
        readFile('./data.json', {encoding: 'utf8'}, function(err, body){
            console.log(1);
            if(err){
            
                if(err.code === 'ENOENT'){
                    console.log('read error: File not found');
                }
                else{
                    console.log('read error:', err);
                }
            }
            else{
                body = JSON.parse(body);
    
                for(let i=0; i<body.records.length; i++){
                    if(body.records[i].name === x[0]){
                        body.records[i] = obj;
                        break;
                    }
                }
    
                body = JSON.stringify(body);
    
                writeFile('./data.json', body, function(err){
                    console.log(2);
                    if(err){
                        console.log('err', err);
                    }
                    else{
                        console.log('updateRecord done.');
                    }
                });
            }
        });
            }
    );

    start();