var express = require('express') //we want to use express
var app = express(); //starts express
var server = require('http').Server( app ) // start a server instance on a port
var io = require('socket.io')(server) //use socket.io for real time connections aka. wesockets

server.listen(3000, function(){ // set up a server on port 3000, do a callback when it starts successfully
  console.log("server started on 3000");
})

app.use ( express.static('public') ) //serve out everything in the public folder



io.on('connect', function(socket){ //turn on socket on connect. If socket.io sees a new connection, do something...
console.log(socket.id); //prints out socket that connected. (ie. all users + the projection)

  socket.on('addRectangle', function(data){ //look for any messages with the 'addRectangle'
    //console.log("addRectangle" + " " + data) //log out the 'data' in this case, true. but could be used to get any arbitrary date. position, color, cursor position, etc.
    io.emit('projectionRectangle', true) //If socket receives "addrectangle" then send "projectionRectangle". send out a message to the projection to add a rectangle to the screen.
  })

  //persistent variable
  //passing position data
  //storing position data in an array..

})
