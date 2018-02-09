$(document).ready(function(){
    console.log('test');
    var socket = io.connect();

    $('#sbutton').click(function(){
        socket.emit('button_clicked',{reason:'sb'});
    })
    socket.on('server_response',function(data){
        console.log('server says:'+data.response);
    });
    socket.on('my_emit_event',function(data){
        console.log('server says:'+data.news);
    })
    socket.on('my_broadcast_event',function(data){
        console.log('server says:'+data.news);
    })
    socket.on('my_full_broadcast_event',function(data){
        console.log('server says:'+data.news);
    })





})