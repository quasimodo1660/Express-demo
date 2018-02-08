var express = require("express");
var app = express();
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
var session = require('express-session');
app.use(session({secret:'sbfrank'}));


session.times=0;


app.get('/',function(request,response){
    if (session.times!=undefined){
        session.times+=1;
    }
    else{
        session.times=1;
    }
    response.render('counter',{times:session.times});
})

app.get('/add2',function(req,res){
    session.times+=1;
    res.redirect('/')
})

app.get('/reset',function(req,res){
    session.times=undefined;
    res.redirect('/')
})

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/static/css'));
console.log(__dirname);

app.listen(6789,function(){
    console.log('Listening on port 6789');
})

