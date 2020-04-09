var express = require('express')
var app = express()
let port=5000
//set up a template engine
app.set('view engine', 'ejs')

//use inbuilt middleware for serving static files
app.use(express.static('./')) // ./ means current directory

//require the files for the controller
var todoController=require('./controllers/todoController')

//fire up the controller
todoController(app)

app.listen(port, function(){
    console.log("Server started at port "+port)
})
