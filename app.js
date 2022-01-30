const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const port = process.env.PORT|| 3000

app.use(bodyParser.urlencoded({extended: true}))


const users = [
    {id: 1 , name: 'User 1'},
    {id: 2 , name: 'User 2'},
    {id: 3 , name: 'User 3'},
    {id: 4 , name: 'User 4'},
    {id: 5 , name: 'User 5'},
    {id: 6 , name: 'User 6'},
    {id: 7 , name: 'User 7'},
    {id: 8 , name: 'User 8'},
    {id: 9 , name: 'User 9'},
    {id: 10 , name: 'User 10'},
    {id: 11 , name: 'User 11'},
    {id: 12 , name: 'User 12'},
    {id: 13 , name: 'User 13'},
    {id: 14 , name: 'User 14'},
    {id: 15 , name: 'User 15'},
    {id: 16 , name: 'User 16'},
    {id: 17 , name: 'User 17'},
    {id: 18 , name: 'User 18'},
    {id: 19, name: 'User 19'},
]
const post = [
    {id: 1 , name: 'Post 1'},
    {id: 2 , name: 'Post 2'},
    {id: 3 , name: 'Post 3'},
    {id: 4 , name: 'Post 4'},
    {id: 5 , name: 'Post 5'},
    {id: 6 , name: 'Post 6'},
    {id: 7 , name: 'Post 7'},
    {id: 8 , name: 'Post 8'},
    {id: 9 , name: 'Post 9'},
    {id: 10 , name: 'Post 10'},
    {id: 11 , name: 'Post 11'},
    {id: 12 , name: 'Post 12'},
    {id: 13 , name: 'Post 13'},
    {id: 14 , name: 'Post 14'},
    {id: 15 , name: 'Post 15'},
    {id: 16 , name: 'Post 16'},
    {id: 17 , name: 'Post 17'},
    {id: 18 , name: 'Post 18'},
    {id: 19, name: 'Post 19'},
]

app.get('/post', (req, res)=>{
    
})

app.get('/users', paginatedResults(posts), (req,res)=>{
    // So it can return numbers instead of a string
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1)* limit
    
    const endIndex = page * limit

    const results = {}

    if(endIndex < users.length){
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
  
   results.results = users.slice(startIndex, endIndex)
    res.json(results)
})

// Middleware 
function paginatedResults(model){
    return(req,res, next)=>{
    // So it can return numbers instead of a string

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Getting the start index so the page request can be handle properly

    const startIndex = (page - 1)* limit
    // Getting the end index so the page request can be handle properly
    
    const endIndex = page * limit

    const results = {}

    if(endIndex < model.length){
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
  
   results.results = model.slice(startIndex, endIndex)
   res.paginatedResults=  results
   next()
    }
}
app.listen(port, ()=>{
    console.log("Server is running on port 3000")
})