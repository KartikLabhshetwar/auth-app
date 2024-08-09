const express = require("express");
const PORT = process.env.PORT || 8080
const app = express();
const {user} = require("./zod/types");
const {users} = require("./models/db");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.post('/signup', async function(req, res){
    const payload = req.body;
    const parsePayload = user.safeParse(payload);

    //input validation is done here.
    if(!parsePayload.success){
        res.status(411).json({
            message: "You have sent wrong inputs."
        })
        return;
    }

    const {username, password} = parsePayload.data

    //after validation in done successfully user is added in the database and token send to the client.
    try{
        const newUsers = await users.create({
            username: username,
            password: password
        })

        const token = jwt.sign({username: newUsers.username, password: newUsers.password}, JWT_SECRET, {expiresIn: '1h'})

        res.json({
            msg: "User created",
            token: token
        })
    } catch(e){
        res.status(500).json({
            msg: "Internal server error"
        })
    }

})

app.post('/login', function(req, res){
    //here we grab token from the header and verify if the user if valid or not.
    const header = req.header("authorization")
    if(!header){
        res.status(400).json({
            msg: "No auth header found."
        })
        return;
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    try {
        if(!decoded){
            res.status(400).json({
                msg: "Unauthorized access"
            })
        } else{
            res.json({
                msg: "You are logged in successfully."
            })
        }
    } catch(e){
        res.status(500).json({
            msg: "jwt must be provided"
        })
    }

})

app.listen(PORT, ()=>{
    console.log("Port is listening..");
    
})
