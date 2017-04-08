import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the Tickets page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-tickets',
    templateUrl: 'tickets.html',
})
export class Tickets {
    dates: any[];
    tickets: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.dates = [];

        this.tickets = [
            {
                id: 0,
                date: '2017-02-14',
                time: '12:00',
                location: 'Rr e Barrikadave, Tirane',
                status: 'Aprovuar'
            },
            {
                id: 1,
                date: '2017-02-14',
                time: '14:30',
                location: 'Rr e Barrikadave, Tirane',
                status: 'Ne pritje per aprovim'
            },
            {
                id: 0,
                date: '2017-03-08',
                time: '14:00',
                location: 'Rr e Barrikadave, Tirane',
                status: 'Ne pritje per anullim'
            },
            {
                id: 0,
                date: '2017-04-12',
                time: '11:00',
                location: 'Rr e Barrikadave, Tirane',
                status: 'Anulluar'
            }
        ];

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

    ionViewDidLoad() {
        console.log('ionViewDidLoad Tickets');
        console.log(this.dates);
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

}
