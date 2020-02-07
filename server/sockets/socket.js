const { io } = require('../server');
const { TicketControl } = require('../classses/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('nextTicket', (data, callback) => {

        let next = ticketControl.nextTicket();
        console.log(next);
        callback(next);

    });

    client.emit('actualTicket', {
        actual: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLast4Ticket()
    });

    client.on('atenderTicket',(data,callback)=>{

        if(!data.desktop){
            return callback({
                err:true,
                messager: 'Desktop is nescesary'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.desktop);

        callback(atenderTicket);

        client.broadcast.emit('lastfour',{
            lastFour: ticketControl.getLast4Ticket()
    
        });
    

    });

});