import {use,start} from "./05a-httpfreamwork.js";

use("index.html", function (request,response) {
    response.write(`
     <html>
        <head>
            <title>hello</title>
        </head>
        <body>
            <b>Hello world!!</b>
        </body>
    </html>
    `)

    response.end();

})



start();