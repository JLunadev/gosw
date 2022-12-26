const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const db = new (require('@replit/database'))();

app.use(express.static('public'));

app.get('/', res => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/redirect.html');
});

io.on('connection', socket => {
  let lastRequest = 0;
  
  socket.on('shorten', url => {
    if(Date.now() - lastRequest < 5000) {
      io.to(socket.id).emit('wait');
    } else {
      lastRequest = Date.now();
      addURL(url, io.to(socket.id));
    }
  });

  socket.on('get-url', code => {
    db.get(code)
    .then(url => {
      io.to(socket.id).emit('send-url', url);
    });
  });
});


async function addURL(url, client) {
  let code = await findCode();
  if(!/^https?:\/\//.test(url)) {
    url = 'https://' + url;
  }
  db.set(code, url)
  .then(() => {
    client.emit('added', code);
  });
}

const findCode = () => new Promise(resolve => {
  let getNewCode;
  (getNewCode = () => {
    let code = randomCode();
    db.get(code)
    .then(url => {
      if(url) {
        getNewCode();
      } else {
        resolve(code);
      }
    });
  })()
});

function randomCode() {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let code = ['-', '-', '-'];
  for(let i in code) {
    code[i] = chars[Math.floor(Math.random() * 63)];
  }
  return code.join('');
}

server.listen(3000);
console.log('🤪');

