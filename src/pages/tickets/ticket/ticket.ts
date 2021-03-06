import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from './pop-over';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.html',
    inputs: ['ticketitem']
})

export class Ticket {
    ticketitem : any;
    constructor(public popoverCtrl: PopoverController) {
    }

    getStatusColor(status){
        switch(status){
            case 'Aprovuar':
                return '#32db64';
            case 'Anulluar':
                return '#f53d3d';
            case 'Ne pritje per anullim':
                return '#f2672a'
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

    showMenu(evt){
        let menu = this.popoverCtrl.create(PopoverPage, {ticketitem: this.ticketitem});
        menu.present({
            ev: evt
        });
    }

}
