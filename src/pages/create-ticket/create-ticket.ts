import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tickets } from '../tickets/tickets';
import { TicketsProvider } from '../../providers/tickets-provider';

/**
 * Generated class for the CreateTicket page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-create-ticket',
    templateUrl: 'create-ticket.html',
})
export class CreateTicket {

    date: any;
    time: any;
    location: any;
    minDate: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public ticketsProvider: TicketsProvider) {
        this.minDate = new Date().toISOString();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateTicket');
    }

    createTicket(){
        let ticket = {
            date: this.date,
            time: this.time,
            location: this.location
        }
        this.ticketsProvider.create(ticket)
        .then(() => {
            this.navCtrl.pop();
        })
        .catch((err) => {
            console.log(err);
        })
    }

}
