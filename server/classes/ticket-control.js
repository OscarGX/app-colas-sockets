const fs = require('fs');

class Ticket {
    constructor(numero, desk) {
        this.numero = numero;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.tickets = [];
        this.ultimo = 0;
        this.lastFour = [];
        this.alv = [];
        this.hoy = new Date().getDate();
        const data = require('../data/data.json');
        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.resetCount();
        }
    }

    resetCount() {
        this.ultimo = 0;
        this.tickets = [];
        this.lastFour = [];
        this.saveData();
    }

    next() {
        this.ultimo++;
        this.tickets.push(new Ticket(this.ultimo, null));
        this.saveData();
        return `Ticket ${this.ultimo}`
    }

    getLastTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    saveData() {
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            lastFour: this.lastFour
        };
        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }

    attendTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        const ticketNumber = this.tickets[0].numero;
        this.tickets.shift();
        const ticketToAttend = new Ticket(ticketNumber, escritorio);
        this.lastFour.unshift(ticketToAttend);
        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1);
        }
        return ticketToAttend;
    }
}

module.exports = {
    TicketControl
}