
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
let db = new sqlite3.Database('/Users/Ben/Desktop/FoodTruck/db.sqlite3',(err)=>{
    if(err){
        console.error(err.message);
    }
    console.log('Connected to the FD database.')
})

let sql='SELECT DISTINCT username FROM auth_user';
db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.username);
    });
  });



db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });




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

app.listen(6789,function(){
    console.log('Listening on port 6789');
})

