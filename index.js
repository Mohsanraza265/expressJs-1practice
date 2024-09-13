const express = require('express')
const fs = require('fs');
const app = express()
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs')

app.get("/", function(req , res){
    // if i set file loaded on route then use render keyword
    fs.readdir(`./files`, function(err, files){
        console.log(files)
    })
    res.render("index")
})
app.get("/profile/:username/:age", function(req, res){
    res.send(`Name: ${req.params.username} Age: ${req.params.age}`)
})

app.listen(3000, function(){
    console.log("its running")
})