var express = require("express");
var app = express();

app.get('/',function(request,response){
    response.send('<h1>'+request.headers['user-agent']+'</h1>');
}).listen(6789,function(){
    console.log('Listening on port 6789');
})

