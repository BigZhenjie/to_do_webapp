import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
var workTodos = [];
var dailyTodos = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port,() =>{
    console.log(`Server is listening on port: ${port}`);
})

app.get("/", (req, res) =>{
    res.render("index.ejs");
})

app.post("/work", (req, res) =>{
    console.log(workTodos);
    if(req.body["todo"] !== workTodos[workTodos.length - 1]){
        workTodos.push(req.body["todo"]);
    }
    res.render("work.ejs", {todo: workTodos, length: workTodos.length});   
})

app.get("/work", (req, res) =>{
    res.render("work.ejs", {todo: workTodos, length: workTodos.length});
})

app.post("/daily", (req, res) =>{
    console.log(dailyTodos);
    if(req.body["todo"] !== dailyTodos[dailyTodos.length - 1]){
        dailyTodos.push(req.body["todo"]);
    }
    res.render("daily.ejs", {todo: dailyTodos, length: dailyTodos.length});   
})

app.get("/daily", (req, res) =>{
    res.render("daily.ejs", {todo: dailyTodos, length: dailyTodos.length});
})

app.get("/daily", (req, res) =>{
    res.render("daily.ejs");
})