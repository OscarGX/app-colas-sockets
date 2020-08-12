const socket = io();
const small = $('small');
const queryParams = new URLSearchParams(window.location.search);

if (!queryParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es requerido');
}

const desk = queryParams.get('escritorio');

$('h1').text(`Escritorio ${desk}`);

$('button').click(() => {
    socket.emit('attendTicket', { desk }, (resp) => {
        if (resp === 'No hay tickets') {
            small.text(resp);
            return;
        }
        small.text(`Ticket ${resp.numero}`);
    });
});