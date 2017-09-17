import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AlertController, NavParams, NavController } from 'ionic-angular';
import { TicketsProvider } from '../../../providers/tickets-provider';
import { Tickets } from '../tickets';

@Component({
  template: `
        <ion-list>
        <button ion-item *ngIf="navParams.get('ticketitem').status !== 'Anulluar'" (click)="showConfirm('cancel')">Anullo Rezervimin</button>
        <button ion-item *ngIf="navParams.get('ticketitem').status === 'Anulluar'" (click)="showConfirm('delete')">Fshi rezervimin</button>
        </ion-list>
  `
})
export class PopoverPage {
    constructor(public viewCtrl: ViewController, 
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public ticketsProvider: TicketsProvider
    ) {}

    showConfirm(action) {
        let title, message = '';
        let fn;
        switch (action) {
            case 'cancel':
                title = 'Konfirmo anullimin';
                message = 'Deshironi te anulloni kete rezervim?'
                fn = this.cancel.bind(this);
                break;
            case 'delete': 
                title = 'Konfirmo fshirjen';
                message = 'Deshironi te fshini kete rezervim nga lista?';
                fn = this.delete.bind(this);
                break;
        }
        let confirm = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'Jo',
                    handler: () => {
                        this.viewCtrl.dismiss();
                    }
                },
                {
                    text: 'Po',
                    handler: () => {
                        fn();
                    }
                }
            ]
        });
        confirm.present();
    }
    
    cancel() {
        this.ticketsProvider.cancel(this.navParams.get('ticketitem')._id);
        this.viewCtrl.dismiss();
    }
    
    delete() {
        this.ticketsProvider.delete(this.navParams.get('ticketitem')._id).then((res) => {
            // this.navCtrl.push(Tickets);
        })
        this.navCtrl.popToRoot();
        this.viewCtrl.dismiss();
    }
}