const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require('./models/Users');

const cors = require("cors");

app.use(express.json());
app.use(cors());
require("dotenv").config();

PORT = process.env.PORT  || 3001;

mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("mongodb connected")
})
.catch((err) =>{
    console.log("mongodb disconnected")
})

app.get("/getUsers", async (req, res) =>{
    
        try{
            const users = await UserModel.find();
            res.json(users);
        }catch(err){
            console.error(err)
            res.status(500).json({error : "internal server error"});
        }
        

        
    });

app.post("/createUsers", async(req, res) => {
    try{
        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        res.json(user);



    }catch(err){
        console.error(err);
        res.status(500).json({error:"internal server error"});

    }
})

app.put("/updateUsers/:id", async(req, res) =>{
    try{
        const {id} = req.params;
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {new:true})
        res.json(updatedUser);


    }catch(err){
        console.error(err);
        res.status(500).json({error :"Internal server error"})

    }

});


app.listen(PORT, () =>{
    console.log("Server is running");
})

