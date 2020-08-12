const socket = io();
const labelTicket = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Se concectó alv');
});

socket.on('disconnect', () => {
    console.log('Se desconectó alv');
});

socket.on('currentTicketState', (data) => {
    labelTicket.text(data.current);
});

$('button').click((e) => {
    socket.emit('nextTicket', null, (ticket) => {
        labelTicket.text(ticket);
    });
});