$(document).ready(function(){
    console.log('test');
    var socket = io.connect();
    console.log(socket);

    $('#sbutton').click(function(){
        socket.emit('button_clicked',{reason:'sb'});
    })
    socket.on('server_response',function(data){
        console.log('server says:'+data.response);
    });








})