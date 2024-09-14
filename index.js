const express = require('express')
const fs = require('fs');
const app = express()
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs')

app.get("/", function(req , res){
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files})
    })
})
app.post("/create", function(req , res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect("/")
    });
})
app.get("/file/:filename", function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render("show", {filename: req.params.filename, filedata: filedata})
    })
})
app.get("/edit/:filename", function(req, res){
    // fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
    res.render("edit", {filename: req.params.filename})
    // })
})
app.post("/edit", function(req, res){
    fs.rename(`./files/${req.body.prev_title}`, `./files/${req.body.new_title}`, function(err){
        res.redirect("/")
    });
})
app.get("/profile/:username/:age", function(req, res){
    res.send(`Name: ${req.params.username} Age: ${req.params.age}`)
})

app.listen(3000, function(){
    console.log("its running")
})