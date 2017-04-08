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
                location: 'Rr e Barrikadave, Tirane'
            },
            {
                id: 1,
                date: '2017-02-14',
                time: '14:30',
                location: 'Rr e Barrikadave, Tirane'
            },
            {
                id: 0,
                date: '2017-03-08',
                time: '14:00',
                location: 'Rr e Barrikadave, Tirane'
            },
            {
                id: 0,
                date: '2017-04-12',
                time: '11:00',
                location: 'Rr e Barrikadave, Tirane'
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

        console.log(this.tickets);

        this.tickets.forEach((ticket) => {
            let obj = {day: null, month: null}
            let date = new Date(ticket.date);
            obj.day = date.getDate();
            obj.month = this.getMonthName(date.getMonth());
            console.log(this.existsInArray(obj, this.dates));
            if (!this.existsInArray(obj, this.dates)){
                this.dates.push(obj);
            }
        });
        
        // this.dates = this.tickets.map((ticket) => {
        //     let obj = {day: null, month: null}
        //     let date = new Date(ticket.date);
        //     obj.day = date.getDate();
        //     obj.month = this.getMonthName(date.getMonth());
        //     return obj;
        // });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Tickets');
        console.log(this.dates);
    }

    getMonthName(index){
        const months = ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nentor', 'Dhjetor'];
        return months[index];
    }

    existsInArray(obj, arr){
        return arr.forEach((el) => {
            if (JSON.stringify(obj) == JSON.stringify(el))
                return true;
        });
        // return false;
    }

}
