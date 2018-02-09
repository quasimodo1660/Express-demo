
var express = require("express");
var app = express();
var path = require('path');

//***********Headle request post**************/
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//*************Templates**********************/
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
//**session */
var session = require('express-session');
app.use(session({secret:'sbfrank'}));
//********connect to sqlite database***********/
const sqlite3 = require('sqlite3').verbose();
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

app.post('/survey',function(req,res){
    var ts = new Date().toISOString().slice(0, 19).replace('T', ' ')+".000000";
    console.log("INSERT INTO 'lunchbox_tag' (name, category_id) VALUES ("+req.body.Name+','+1+')');
    console.log(ts);
    console.log(req.body.Name);
    let db = new sqlite3.Database('/Users/Ben/Desktop/FoodTruck/db.sqlite3',(err)=>{
        if(err){
            console.error(err.message);
        }
        console.log('Connected to the FD database.')
    })
    
    db.run("INSERT INTO 'lunchbox_tag' (name, category_id) VALUES ("+'"'+req.body.Name+'",'+1+')', function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    
    
    db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });

    res.redirect('http://localhost:8000/result')
})



app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/static/css'));
console.log(__dirname);

var server = app.listen(6789,function(){
    console.log('Listening on port 6789');
})
//***sockets stuff *********/
var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    socket.on( "button_clicked", function (data){
        console.log( 'Someone clicked a button!  Reason: '  + data.reason);
        socket.emit( 'server_response', {response:  "sockets are the best!"});
        socket.broadcast.emit( "my_broadcast_event",{news:'one to one broadcast!'});
    });
     //  EMIT:
     socket.emit( 'my_emit_event',{news:'server emit an action!'});
     //  BROADCAST:
     
     //  FULL BROADCAST:
     io.emit( "my_full_broadcast_event",{news:'Welcome!'});
})

