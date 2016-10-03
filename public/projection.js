  //io.connect from socket.io API
  var socket = io.connect('http://localhost:3000') //set up a place for us to connect to, and try to connect.

  socket.on('projectionRectangle', function(data){
    console.log(data); //whenever projection message comes in, do something with it

//make html and css before appending it to screen.
$('<div>👾</div>').css({
  'position':'absolute',
  'top':data.top,
  'left':data.left,
}).appendTo('body')

  })

socket.on('storedPositionMessage', function(spData){
  console.log(spData);

  spData.forEach(function(position){
    $('<div> 💯 </div>').css({
      'position':'absolute',
      'top':position.top,
      'left':position.left,
    }).appendTo('body')
  })
})
