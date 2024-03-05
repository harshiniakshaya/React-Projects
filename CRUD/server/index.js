const express = require("express");
const users = require("./sample.json");
const cors = require("cors");
//for dealing with files
const fs = require("fs");

const app = express();
app.use(express.json());

const port = 8000;

app.use(cors(
    {
        origin:"http://localhost:5173", //client 
        methods:["GET","POST","PATCH","DELETE"]
    }
));

app.get("/users",(req,res)=>{
    return res.json(users);
})

//delete functionality
app.delete("/users/:id",(req,res)=>{
    let id = Number(req.params.id);
    let filteredUsers = users.filter((user)=>user.id!==id);
    fs.writeFile("./sample.json",JSON.stringify(filteredUsers),(err,data)=>{
        return res.json(filteredUsers);
    })
})

//add user functionality
app.post("/users",(req,res)=>{
    let {name,age,city} = req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"All fields required!"});
    }
    else{let id=Date.now();
    //adding records to the user array
    users.push({id,name,age,city})
    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({message:"User details added successfully!"});
    })}
})

//update functionality
app.patch("/users/:id",(req,res)=>{
    let id = Number(req.params.id);
    let {name,age,city} = req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"All fields required!"});
    }
    let index = users.findIndex((user)=>user.id==id);
    users.splice(index,1,{...req.body});

    fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
        return res.json({message:"User details updated successfully!"});
    })
})

app.listen(port,(err)=>{
    console.log(`Server running in port ${port}`);
})