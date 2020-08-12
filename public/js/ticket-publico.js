const socket = io();
const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');
const lblDesk1 = $('#lblEscritorio1');
const lblDesk2 = $('#lblEscritorio2');
const lblDesk3 = $('#lblEscritorio3');
const lblDesk4 = $('#lblEscritorio4');
let tickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let desks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on('currentTicketState', (data) => {
    // console.log(data);
    renderHTML(data.lastFour);
});

socket.on('lastFour', (data) => {
    renderHTML(data.lastFour);
});

function renderHTML(lastFour) {
    for (let i = 0; i < lastFour.length; i++) {
        tickets[i].text(`Ticket ${lastFour[i].numero}`);
        desks[i].text(`Escritorio ${lastFour[i].desk}`);
    }
}