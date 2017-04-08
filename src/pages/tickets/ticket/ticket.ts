import { Component } from '@angular/core';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.html',
    inputs: ['ticketitem']
})

export class Ticket {
    ticketitem : any;
    constructor() {
    }

    getStatusColor(status){
        switch(status){
            case 'Aprovuar':
                return '#32db64';
            case 'Anulluar':
                return '#f53d3d';
            default: 
                return '#fa9e1e';
        }
    }

    getStatusIcon(status){
        switch(status){
            case 'Aprovuar':
                return 'checkmark-circle';
            case 'Anulluar':
                return 'close-circle';
            default: 
                return 'help-circle';
        }
    }

}