const fs = require("fs");
const requestIp = require("request-ip")
const express = require("express");
const dotenv = require("dotenv");
const hbs = require("hbs");


const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper("getYear",()=>new Date().getFullYear());
app.set("view engine","hbs");
app.use(requestIp.mw());
app.use((req,res,next)=>{
    let now =Date.now();
    let reqData = JSON.stringify({
	ip: req.ip,
	method: req.method,
	url: req.url,
	timeStamp: now,
    });
    fs.appendFile("serverlog.json",reqData+"\n","utf8",err=>{
	if(err)console.log(err);
    })
    next()

})
/*
app.use((req,res,next)=>{
    res.render("maintenance.hbs");
})
*/
app.use(express.static(__dirname+"/public"));
//console.log(app);

app.get("/",(req,res)=>{
    //console.log(req);

    //res.send("<h1>Its working!!!</h2>");
    res.render("home.hbs",{
	title: "Home page",
	msg: "Welcome home, stay tune!!",
	//year: new Date().toDateString(),
    });
});

app.get("/about",(req,res)=>{
    //res.type("text/html");
    res.render("about.hbs",{
	title: "Naughty boy",
	//year: new Date().getFullYear(),
    })

});

app.get("/bad",(req,res)=>{
    res.send({
	errorMessage: "this is an error",
    });
})


app.listen(port,(err)=>{
    if(err)return console.log(err);
    console.log("server is running at localhost: "+port)
});

