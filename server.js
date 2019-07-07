var express = require('express');
var bodyParser  = require('body-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000},
    num: 1
}));
// app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// count
app.get("/", function(request, response){
    request.session.num += 1;
    let num = request.session.num;
    console.log(request.session.num);
    response.render('count', {count_num: num});
});

app.post("/add", function(request, response){
    request.session.num += 2;
    response.redirect('/');
});

app.post("/destroy", function(request, response){
    request.session.destroy();
    response.redirect('/');
});

app.listen(8000, function(){
    console.log("listening on port 8000");
});