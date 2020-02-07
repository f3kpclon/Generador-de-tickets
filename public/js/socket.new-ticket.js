
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function (){
    console.log('Conectado al servidor!');
        

});
socket.on('disconnect', function(){
    console.log('Conexión perdida!!');
    
});
socket.on('actualTicket', function (resp) {
   label.text(resp.actual);
});

$('button').on('click', function () {

socket.emit('nextTicket', null, function(nextTicket){
    label.text(nextTicket);
});

});  