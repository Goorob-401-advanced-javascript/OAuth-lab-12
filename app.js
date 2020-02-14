
'use strict';

require('dotenv').config();
const express = require('express');
const basicAuth = require('./basic-auth-middleware.js');
const oauthMidd = require('./oauth-middleware.js');
const User = require('./user.js');

const app = express();

app.use(express.json());
app.use(express.static('./public'));
app.post('/signup', (req, res , next) => {
  let user = new User(req.body);
  user.save()
    .then((user) => {
      let token = user.generateToken(user);
      res.status(200).send(token);
    }).catch(next);
});

app.post('/signin', basicAuth, (req, res , next) => {
  res.status(200).send(req.token);
});

// app.get('/users', basicAuth, (req, res) => {
//   res.status(200).json(users.list());
// });

app.get('/oauth',oauthMidd,oauth);

function oauth(req, res, next) {
  console.log('hello',req.body);
  res.json(req.token);
}
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};





























// 'use strict';
// const express = require('express');
// const basicAuth = require('./basic-auth-middleware.js');
// const users = require('./user.js');
// const app = express();
// app.use(express.json());
// app.post('/signup',(req ,res)=>{ // there's no need to run it through basicAuth cuz it ctreae that for me
// users.save(req , res)
// .then (user =>{
//     let token = users.generateToken(user);
//     res.status(200).send(token);
// })
// });
// app.post('/signin', basicAuth ,(req ,res)=>{ // when i sign in you need to run basicAuth to make sure iam who i say i am
//  res.status(200).send(req.token);
// });
// app.get('/users',basicAuth , (req , res)=>{
// res.status(200).json(user.list());
// });


// app.listen(3000,()=> console.log('listening on '))
