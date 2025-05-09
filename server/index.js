const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require('./models/Users');

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://nethuhasi2001:OSNuetw48ItTYYCB@cluster0.4xdxhad.mongodb.net/mernTutorial?retryWrites=true&w=majority&appName=Cluster0" , {
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



    }catch{
        console.error(err);
        res.status(500).json({error:"internal server error"});

    }
})


app.listen(3001, () =>{
    console.log("Server is running");
})

// OSNuetw48ItTYYCB - pw
// nethuhasi2001 - username