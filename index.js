const express = require("express");
const pool = require ('./db_connection')

const app = express();
app.use(express.json());

function simpleResponse(res) {
  return (error, result) => {
    if (error) {
      res.statusCode(500).json(error);
    } else {
      res.statusCode(200).json(result);
    }
  };
}

app.post("/api/register", (req, res) => {
  let { email, password } = req.body;
  pool.query(
    `INSERT INTO users (email, password) VALUES('${email}', '${password}');`,
    simpleResponse(res)
  );
});

app.post("/api/lobby", (req, res) => {
  let { name, admin } = req.body;
  pool.query(
    `INSERT INTO room (Name, Admin) VALUES('${name}', '${admin}');`,
    simpleResponse(res)
  );
});

app.post("/api/lobby/:lobby_id/add-user", (req, res) => {
  let { userId } = req.body;
  let lobbyId = req.params.lobby_id;
  pool.query(
    `INSERT INTO invitations (lobby_id, user_id) VALUES('${lobbyId}', '${userId}');`,
    simpleResponse(res)
  );
});

app.get("/api/lobby/:lobby_id", (req, res) => {
  let lobbyId = req.params.lobby_id;
  pool.query(
    `SELECT * FROM chat WHERE chat.lobby_id = ${lobbyId};`,
    simpleResponse(res)
  );
});

app.get("/api/lobby/:lobby_id/:message_id", (req, res) => {
  let lobbyId = req.params.lobby_id;
  let messageId = req.params.message_id;
  pool.query(
    `SELECT * FROM chat WHERE chat.lobby_id = ${lobbyId} AND chat.id = ${messageId};`,
    simpleResponse(res)
  );
});

app.post("/api/lobby/:lobby_id", (req, res) => {
  let lobbyId = req.params.lobby_id;
  let {author, message} = req.body;
  pool.query(
    `INSERT INTO chat (lobby_id, author, message) VALUES (${lobbyId}, ${author}, "${message}");`,
    simpleResponse(res)
  );
});

app.get("/api/users/:lobby_id", (req, res) => {
  let lobbyId = req.params.lobby_id;
  pool.query(
    `SELECT * FROM users JOIN invitation ON invitation.user_id = users.id WHERE invitation.lobby_id = ${lobbyId};`,
    simpleResponse(res)
  );
});

app.get("/api/users/:user_id", (req, res) => {
  let lobbyId = req.query.lobby_id;
  let userId = req.params.user_id;
  let isAdmin = true;
  if (isAdmin) {
    pool.query(
      `SELECT * FROM users WHERE users.id = ${userId};`,
      simpleResponse(res)
    );
  } 
  else {
    pool.query(
      `SELECT * FROM users JOIN invitation ON invitation.user_id = users.id WHERE invitation.lobby_id = ${lobbyId} AND users.id = ${userId};`,
      simpleResponse(res)
    );
  }
});
