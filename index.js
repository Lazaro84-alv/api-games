var express = require('express');
var bodyParser = require('body-parser');
const DB = require('./db');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./loginAuth');

const JWTSecret = 'hgdayidawldnqldnx';

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/games',auth,(req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get('/game/:id',auth,(req, res) => {

  if(isNaN(req.params.id)){
    res.sendStatus(400);
  } else{
    
    var id = parseInt(req.params.id);

    var game = DB.games.find(g => g.id == id);

    if(game != undefined){
      res.statusCode = 200;
      res.json(game);
    }else{
      res.sendStatus(404);
    }
  }
});

app.post('/game',auth, (req, res) => {

  var {title, price, year} = req.body;

  DB.games.push({
    id: 2323,
    title,
    price,
    year
  });
  res.sendStatus(200);
})

app.delete('/game/:id',auth,(req, res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400);
  } else{
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex(g => g.id == id);

    if(index == -1){
      res.sendStatus(404);
    }else {
      DB.games.splice(index,1);
      res.sendStatus(200);
    }
  }
});

app.put('/game/:id', (req, res) => {
  if(isNaN(req.params.id)){
    res.sendStatus(400);
  } else{
    
    var id = parseInt(req.params.id);

    var game = DB.games.find(g => g.id == id);

    if(game != undefined){
      
      var {title, price, year} = req.body;

      if(title != undefined){
        game.title = title;
      }

      if(price != undefined){
        game.price = price;
      }

      if(year != undefined){
        game.year = year;
      }

      res.sendStatus(200);

    }else{
      res.sendStatus(404);
    }
  }
});

app.post('/auth', (req, res) => {

  var {email, password} = req.body;

  if(email != undefined){

    var user = DB.users.find(u => u.email == email);

    if(user != undefined){

      if(user.password == password){

        jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn: '48h'}, (err, token) => {
          if(err){
            res.status(400);
            res.json({err: 'Falha interna'});
          }else{
            res.status(200);
            res.json({token: token});
          }
        })
      }else{
        res.status(401);
        res.json({err: 'Credenciais inválidas!'});
      }

    }else{
      res.status(404);
      res.json({ err: 'Usuário não cadastrado'});
    }

  }else{
    res.status(400);
    res.json({ err: 'E-mail ou senha inválidos'});
  }
})

app.listen(3000, () => {
  console.log('API Running!')
});