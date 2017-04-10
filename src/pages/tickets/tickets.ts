import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets-provider';
import { LoadingController } from 'ionic-angular';




/**
 * Generated class for the Tickets page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-tickets',
    templateUrl: 'tickets.html'
    // providers: [TicketsProvider]
})
export class Tickets {
    dates: any[];
    tickets: any[];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public ticketsProvider: TicketsProvider,
        public loadingCtrl: LoadingController
    ) {

        this.dates = [];
        
    }

    ngOnInit(){
        let loader = this.loadingCtrl.create({
            content: "Duke ngarkuar..."
        });
        loader.present();
        this.ticketsProvider.getTickets().then((tickets) => {
            this.tickets = tickets;
            this.buildDatesObject();
            loader.dismiss();
        });
    }

    ionViewDidLoad() {
    }

    createTicket(){
        // let date = `2017-${this.getRandomInt(1, 12)}-${this.getRandomInt(1, 28)}`
        // let ticket = {
        //     date: date,
        //     time: '14:50',
        //     location: 'Rr e Barrikadave, Tirane',
        //     status: 'Ne pritje per aprovim'
        // }

        // this.ticketsProvider.create(ticket).then((newTicket) => {
        //     this.tickets.push(newTicket);
        //     this.buildDatesObject();
        // })
        this.navCtrl.push("CreateTicket");
    }

    getMonthName(index){
        const months = ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nentor', 'Dhjetor'];
        return months[index];
    }

    getDate(dateString) {
        return new Date(dateString).getDate();
    }

    getMonth(dateString) {
        return this.getMonthName(new Date(dateString).getMonth());
    }

    buildDatesObject(){

        this.dates = [];

        this.tickets.sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            if (dateA < dateB)
                return -1;
            else
                return 1;
        });


        this.tickets.forEach((ticket) => {
            if(this.dates.length > 0 && this.dates[this.dates.length - 1].date === ticket.date){
                this.dates[this.dates.length-1].tickets.push(ticket);
            }
            else {
                let obj = {date: null, tickets: []}
                obj.date = ticket.date;
                obj.tickets.push(ticket);
                this.dates.push(obj);
            }
        });
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
