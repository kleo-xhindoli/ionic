import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// import { Tickets } from '../tickets/tickets';
import { TicketsProvider } from '../../providers/tickets-provider';
import { DateTimeModal } from './datetime-modal/datetime-modal';

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
    service: any;
    minDate: string;
    nbServices: number;
    errorMessage: string;
    error: boolean;
    readableDate: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public ticketsProvider: TicketsProvider, public modalCtrl: ModalController) {
        this.minDate = new Date().toISOString();
        this.nbServices = 1;
        this.errorMessage = "";
        this.error = false;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateTicket');
    }

    createTicket(){
        let hours = parseInt(this.time.split(':')[0]);
        let mins = parseInt(this.time.split(':')[1]);
        mins += 20 * this.nbServices;
        while(mins - 60 >= 0){
            hours++;
            mins -= 60;
        }
        let endTime = this._pad(hours, 2) + ':' + this._pad(mins, 2);
        console.log(endTime);
        let ticket = {
            date: this.date,
            time: this.time,
            location: this.location,
            service: this.service,
            nbServices: this.nbServices,
            endTime: endTime
        }
        this.ticketsProvider.create(ticket)
        .then(() => {
            this.navCtrl.pop();
        })
        .catch((err) => {
            this.navCtrl.pop();
            console.log(err);
        })
    }

    openDateTimePopup(ev){
        ev.stopPropagation();
        ev.preventDefault();
        if (!this.location || !this.service || !this.nbServices) {
            this.errorMessage = "Ju duhet te plotesoni fushat me siper para se te zgjidhni kohen e rezervimit.";
            this.error = true;
            setTimeout(() => {
                this.errorMessage = "";
                this.error = false;
            }, 4000);
        }
        else {
            // this.navCtrl.push(DateTimeModal, {nbServices: this.nbServices});
            let dateTimeModal = this.modalCtrl.create(DateTimeModal, {nbServices: this.nbServices});
            dateTimeModal.onDidDismiss((data) => {
                this.date = data.date;
                this.time = data.time;
                this.setReadableDate();
            });
            dateTimeModal.present();
        }
    }

    _pad(str, chars){
        let out = '';
        for(var i = 0; i < (chars = str.length); i++){
            out += '0';
        }
        return out + str;
    }

    plural(srv){
        if (!srv || srv.length === 0)
            return 'Sherbimeve';
        else
            return srv.split(' ')[0] + 've';
    }

    setReadableDate(){
        let m = this.date.split('-')[1];
        let d = this.date.split('-')[2];
        let y = this.date.split('-')[0];
        this.readableDate = `${d}/${m}, ${this.time}`;
    }

}
