var app = require('express')(); //use the express js framework to server out html files (handle the request and response on th eserver)
var server = require('http').Server( app ) // start a server instance on a port
var io = require('socket.io')(server) //use socket.io for real time connections aka. wesockets

server.listen(3000, function(){ // set up a server on port 3000, do a callback when it starts successfully
  console.log("server started on 3000");
})

//gets a file. Looks in root directory.
//req is an object containing information about the HTTP request that raised the event. In response to req, you use res to send back the desired HTTP response.
//req=request res=response.
//Those parameters can be named anything.

app.get('/', function(req,res){ //look at the root request using express.js (notice the 'app' at the beginning)
  res.sendFile(__dirname + "/public/index.html") //after a request, respond aka 'res' with file that we want to send back to user. In this case, index.html
})

app.get('/projection', function(req,res){ //look at /projection path and send back the projection .html
  res.sendFile(__dirname + "/public/projection.html")
})

io.on('connect', function(socket){ //turn on socket on connect. If socket.io sees a new connection, do something...
console.log(socket.id); //prints out socket that connected. (ie. all users + the projection)

  socket.on('addRectangle', function(data){ //look for any messages with the 'addRectangle'
    console.log("addRectangle" + " " + data) //log out the 'data' in this case, true. but could be used to get any arbitrary date. position, color, cursor position, etc.
    io.emit('projectionRectangle', true) //If socket receives "addrectangle" then send "projectionRectangle". send out a message to the projection to add a rectangle to the screen.
  })

})
