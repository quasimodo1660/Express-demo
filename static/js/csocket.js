$(document).ready(function(){
    console.log('test');
    var socket = io.connect();

    $('#sbutton').click(function(){
        socket.emit('button_clicked',{reason:'sb'});
    })
    socket.on('server_response',function(data){
        console.log(data);
        console.log('server says:'+data.response);
        console.log('server datas:'+data.reponseData);
        $('#do').append("<div class='col-md-6'><h1>"+data.reponseData.name+"</h1><h2>"+data.reponseData.loc+"</h2><h2>"+data.reponseData.des+"</h2><h2>"+data.response+"</h2></div>")
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
   
    $('#formb').click(function(e){
        socket.emit('form_submit',{
            name:$('#Name').val(),
            loc:$('#location').val(),
            lan:$('#lang').val(),
            des:$('#des').val()
        })
    });

    $('#push').click(function(e){
        socket.emit('push_pressed',{value:$(this).val()})
    });
    socket.on('update_counter',function(data){
        $('#push').val(data.response);
        $('#numberTitle').text('The button has been pushed '+data.response+' time(s)');
    })
    $('#reset').click(function(e){
        $('#push').val('0');
        $('#numberTitle').text('The button has been pushed 0 time(s)');
    })
})