const express = require ("express")
const {Pool, Client} = require ("pg")

const app = express ()
app.use(express.json())

const pool = new Pool ({
    user: "", 
    host: "127.0.0.1",
    database: "daria",
    password: null, 
    port: 5432
}) 

app.post("/api/register", (req, res) => {
    let {email, password} = req.body 
    pool.query(`INSERT INTO users (email, password) VALUES('${email}', '${password}');`, (error, result)=>{
        if (error){
            res.statusCode(500).json(error)
        }
        else {
            res.statusCode(200).json(result)
        }
    })
})
app.post("/api/lobby", (req, res) => {
    let {name, admin} = req.body 
    pool.query(`INSERT INTO lobbies (name, admin) VALUES('${name}', '${admin}');`, (error, result)=>{
        if (error){
            res.statusCode(500).json(error)
        }
        else {
            res.statusCode(200).json(result)
        }
    })
})
app.post("/api/lobby/:lobby_id/add-user", (req, res) => {
    let {userId} = req.body 
    let lobbyId = req.params.lobby_id
    pool.query(`INSERT INTO invitations (lobby_id, user_id) VALUES('${lobbyId}', '${userId}');`, (error, result)=>{
        if (error){
            res.statusCode(500).json(error)
        }
        else {
            res.statusCode(200).json(result)
        }
    })
})

