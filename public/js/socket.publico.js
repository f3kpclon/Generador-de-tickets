var socket = io();

var lbl1 = $('#lblTicket1');
var lbl2 = $('#lblTicket2');
var lbl3 = $('#lblTicket3');
var lbl4 = $('#lblTicket4');

var lblDesk1 = $('#lblEscritorio1');
var lblDesk2 = $('#lblEscritorio2');
var lblDesk3 = $('#lblEscritorio3');
var lblDesk4 = $('#lblEscritorio4');

var lblTickest = [lbl1, lbl2, lbl3, lbl4];
var lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];


socket.on('actualTicket', function (resp) {

    console.log(resp);
    updateHTML(resp.lastFour);

})
socket.on('lastfour', function (resp) {
    updateHTML(resp.lastFour);

})


function updateHTML(lastfour) {

    for (let i = 0; i <= lastfour.length - 1; i++) {
        lblTickest[i].text('Ticket: ' + lastfour[i].num)
        lblDesks[i].text('Escritorio: ' + lastfour[i].desktop)

    }
    return

}