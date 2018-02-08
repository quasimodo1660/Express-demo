var express = require("express");
var app = express();

app.get('/',function(request,response){
    response.send('<h1>'+request.headers['user-agent']+'</h1>');
})

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/static/css'));
console.log(__dirname);

app.listen(6789,function(){
    console.log('Listening on port 6789');
})

