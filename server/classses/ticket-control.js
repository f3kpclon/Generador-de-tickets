const fs = require('fs');
class Ticket {
    constructor(num, desktop) {
        this.num = num;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json')

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.resetCount();
        }
    }

    getLastTicket() {
        return `Ticket N° ${this.last}`
    }
    getLast4Ticket() {
        return this.lastFour;
    }

    atenderTicket(desktop) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numTicket = this.tickets[0].num;
        this.tickets.shift();
        
        let atenderTicket = new Ticket(numTicket,desktop);

        this.lastFour.unshift(atenderTicket);

        if (this.lastFour.length>4) {
            /**Borrar el último elemento */
            this.lastFour.splice(-1,1);
        }

        this.recordArch();
        return atenderTicket;

    }
    nextTicket() {
        let ticket = new Ticket(this.last, null);
        this.last += 1;
        this.tickets.push(ticket);
        this.recordArch();

        return `Ticket N° ${this.last}`
    }
    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour =[];
        console.log('SYSTEM ON!!');

        this.recordArch();
    };

    recordArch() {

        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString)

    }
}



module.exports = {
    TicketControl
}