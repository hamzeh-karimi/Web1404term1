import { createServer } from "http";

let x = 0;

let myserver = createServer(function(requeste,response)
{
    let text = "Number" + x++ ;
    console.log(text);
    console.log("request", requeste.method , requeste.url);

    response.write(text);
    response.end();
}
);

myserver.listen(80);