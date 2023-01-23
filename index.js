var express = require('express');
var socket = require('socket.io')

var app = express();

var server = app.listen(4000, function() {
    console.log('Server running on port 4000');
});

// Serve static index.html file
app.use(express.static('public'));

// Socket setup here
var io = socket(server);

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});