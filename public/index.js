  //io.connect from socket.io API
  var socket = io.connect('http://localhost:3000')

  socket.on('connect', function(data){ //on connect, runs this function
    console.log("connected" + " id# " + socket.id); //socket API call to give user id
  })

  $('body').click(function(e){

    console.log(e);

    $('<div>🔥</div>').css({
      'position':'absolute',
      'top':e.clientY,
      'left':e.clientX,
    }).appendTo('body')

    var dataToSend = {
      'top':e.clientY,
      'left':e.clientX

    }


    socket.emit('addRectangle', dataToSend)
  //add rectangle, true on click
  //send signal to server "addrectangle" socket.io handles the details (party planning)
  })
