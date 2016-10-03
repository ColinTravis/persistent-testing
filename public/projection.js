  //io.connect from socket.io API
  var socket = io.connect('http://localhost:3000') //set up a place for us to connect to, and try to connect.


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
  'border' : '1px solid #11b5f2'
  }).appendTo('body') //attaches it to body. (it is created before being placed)

  })
