const socket = io();
const code = window.location.pathname.substring(1, 4);

socket.emit('get-url', code);

socket.on('send-url', url => {
  if(url) {
    window.location.href = url;
  } else {
    document.getElementById('title').innerHTML = 'Error';
    new Alert('Whoops! This code has no URL attached to it.');
  }
})