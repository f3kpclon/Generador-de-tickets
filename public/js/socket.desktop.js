var socket = io();

var searchParams = new URLSearchParams(window.location.search);


if (!searchParams.has('desktop')) {

    window.location = 'index.html';

    throw Error('Desktop is nescesary');

}

var desktop = searchParams.get('desktop');
var label = $('small');
console.log(desktop);

$('h1').text('Escritorio: ' + desktop);
$('button').on('click', function () {
    socket.emit('atenderTicket', { desktop }, function (resp) {
        if (resp ==='No hay tickets') {
            label.text(resp);
           alert('NO HOY MAS TICKET POR ATENDER');
           return;
        }
        label.text('Ticket: ' + resp.num)
    });
});
