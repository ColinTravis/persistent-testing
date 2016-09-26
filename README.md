# persistent-testing
Testing Node

A demo on how to use node.js and such.


## ===== INSTALLING NODE AND NPM =====

NVM - Version Manager

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash

More information here: https://github.com/creationix/nvm

double-check version with command node -v


## ===== INITIALIZING NODE =====

cd into working dir

node init

--changed "main.js" in package.json to "app.js"

## ===== FILE STRUCTURE =====

Create public folder -- all client facing stuff, duh.

## ===== NPM =====
ExpressJS —

Use npm to install. (Can search npmjs.com for any packages)

npm --save (adds line to json file) install express

## ===== SETTING UP SERVER =====
Require express
var app = require('express')();

Require Server (Node function)
var server = require('http').Server( app )


Tell Server to start listening to port 3000, and log it out to confirm
server.listen(3000, function(){
  console.log("server started on 3000");
})


====

Install socket.io - realtime engine.

Socket.io CDN needs to be added to any client-side file.


=====

### index.html =
<button type="button" name="button">Click it.</button>

=====

### app.js =

io.on('connect', function(socket){ //turn on socket on connect

  socket.on('addRectangle', function(data){
    console.log("addRectangle" + " " + data)
    io.emit('projectionRectangle', true) //If socket receives "addrectangle" then send "projectionRectangle"
  })

})

=====

### projections.html =

<script type="text/javascript">
  //io.connect from socket.io API
  var socket = io.connect('http://localhost:3000')


  $('button').click(function(){
    socket.emit('addRectangle', true)
  //add rectangle, true on click

  })

  socket.on('projectionRectangle', function(data){
    console.log("made it to projection.html" + data); //whenever projection message comes in, do something with it

    var h = window.innerHeight; //learn the size of the screen
    var w = window.innerWidth;

//make html and css before appending it to screen.
$('<div></div>').css({ //make a div. Append CSS to it.
  'position':'absolute',
  'top' :Math.random() * h,
  'left' : Math.random() * w,
  'width' : Math.random()* 500,
  'height' : Math.random()* 500,
  'border' : '1px solid cyan'
  }).appendTo('body') //attaches it to body. (it is created before being placed)

  })

</script>


======= WHAT THIS MEANS =======

### A button is added to the index page.
```
<button type="button" name="button">Click it.</button>
```

### In app.js,
socket is told to turn on when client connects.
```
  io.on('connect', function(socket){ //turn on socket on connect

```

### Back in projection.html,
```
<script type="text/javascript">

  var socket = io.connect('http://localhost:3000') //io.connect from socket.io API

  $('button').click(function(){
    socket.emit('addRectangle', true) //add rectangle, true on click
  })
</script>
```

Connects page to the socket server, first.

Then a click event handler is added that will send "addRectangle" to the server when clicked.

### Back in app.js,
```
socket.on('addRectangle', function(data){
  console.log("addRectangle" + " " + data)
  io.emit('projectionRectangle', true) //If socket receives "addrectangle" then send "projectionRectangle"
})
```
Socket.io receives "addRectangle" from the clicked button, and logs out whether or not it was true. (pulled from projection.html status).
Afterwards, it emits (basically broadcasts) "projectionRectangle" to the server, as well as a state of true.

### Lastly, back in projection.html
```
socket.on('projectionRectangle', function(data){
  console.log("made it to projection.html" + data); //whenever projection message comes in, do something with it

  var h = window.innerHeight; //learn the size of the screen
  var w = window.innerWidth;

//make html and css before appending it to screen.
$('<div></div>').css({ //make a div. Append CSS to it.
'position':'absolute',
'top' :Math.random() * h,
'left' : Math.random() * w,
'width' : Math.random()* 500,
'height' : Math.random()* 500,
'border' : '1px solid cyan'
}).appendTo('body') //attaches it to body. (it is created before being placed)
})
```

Socket.io looks for "projectionRectangle", logs out for debugging, and then starts a function. The function reads the width and height of the screen, then another function begins by creating a div, and assigning CSS to it.

Lastly, this div is appended to the 'body' tag in the html.

Now, if the button is pushed on localhost:3000, then it will show a box on localhost:3000/projection
