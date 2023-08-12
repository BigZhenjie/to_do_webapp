import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";


const app = express();
const port = 3000;


app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
//establish connection with mongo atlas
mongoose.connect("mongodb+srv://admin:admin123@cluster0.owhgdj3.mongodb.net/todolistDB");


//schemas
const itemSchema = new mongoose.Schema({
    name: String
},{
    versionKey: false 
});

const Item = mongoose.model("Item", itemSchema);

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = new mongoose.model("List", listSchema);



//home page is unique
app.get("/", (req, res) =>{
    res.render("index.ejs");
})

app.post("/delete/:destination", async (req, res) =>{
    const itemId = req.body.checkbox;
    const destination = req.params.destination;

    let list = await List.findOne({name: destination});
    let item = list.items.id(itemId);
    await list.items.pull(item);
    list.save();
    
    res.redirect("/" + destination);
})

app.get("/:destination", async (req, res)=>{
    const destination = req.params.destination;
    if(destination !== "favicon.ico"){
        if(!(await List.findOne({name: destination}))){
            const list = new List({
                name: destination,
                items: [{name: "Welcome to you todolist!"}, 
                    {name: "Hit the + button to add a new item."},
                    {name: "<-- Hit this thing right here to delete an item."}]
            });
            console.log("YET");
            list.save();
        }
        const items = await List.findOne({name: destination});
        res.render("list.ejs", {title: destination, todo: items["items"]})
    }
})

app.post("/:destination", async (req, res) =>{
    const destination = req.params.destination;
    let list = await List.findOne({name: destination});
    let newToDo = req.body.todo;
    await list.items.push({name: newToDo});
    await list.save();
    res.redirect("/" + destination);
})


app.listen(port,() =>{
    console.log(`Server is listening on port: ${port}`);
})