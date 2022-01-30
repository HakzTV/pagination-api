
// New
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

const port = process.env.PORT|| 3000

app.use(bodyParser.urlencoded({extended: true}))

// DB Connection
const url = "mongodb://localhost:27017/paginationDB";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
} 
 mongoose.connect(url, options)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
const User = new mongoose.model("User", userSchema)

// Get Route
app.get('/users', paginatedResults(User), (req,res)=>{
    // So it can return numbers instead of a string
    res.json(res.paginatedResults)
})

// Requests are handled here
app.post('/users',(req,res)=>{
    const users = new User({
        name: req.body.name
    })
    users.save((err)=>{
        if(!err){
            console.log(err)
             console.log("User has been added")
            res.redirect("/users")
        }
    })
})
// Middleware function
function paginatedResults(model){
    return async (req,res, next)=>{
    // So it can return numbers instead of a string

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Getting the start index so the page request can be handle properly

    const startIndex = (page - 1)* limit
    // Getting the end index so the page request can be handle properly
    
    const endIndex = page * limit

    const results = {}

    if(endIndex < await model.countDocuments().exec()){
        results.next = {
            page: page + 1,
            limit: limit 
        }
    }
    
    if(startIndex > 0){
        results.previous = {
            page: page - 1,
            limit: limit 
        }
    }
  
    // This replaces the slice
    try{
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults=  results

        next()
    }catch(e){
        res.status(500).json({message : e.message})
    }
     
  
    }
}
app.listen(port, ()=>{
    console.log("Server is running on port 3000")
})