const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketCtrl = new TicketControl();
io.on('connection', (client) => {
    console.log('Usuario conectado');
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('nextTicket', (data, callback) => {
        callback(ticketCtrl.next());
    });

    client.emit('currentTicketState', {
        current: ticketCtrl.getLastTicket(),
        lastFour: ticketCtrl.getLastFour()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                ok: false,
                msg: 'El escritorio es necesario'
            });
        }

        const attendTicket = ticketCtrl.attendTicket(data.desk);
        callback(attendTicket);
        client.broadcast.emit('lastFour', {
            lastFour: ticketCtrl.getLastFour()
        });
    });
});