import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  template: `
        <ion-list>
        <button ion-item (click)="showConfirm()">Anullo Rezervimin</button>
        </ion-list>
  `
})
export class PopoverPage {
    constructor(public viewCtrl: ViewController, public alertCtrl: AlertController) {}

    showConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Konfirmo anullimin',
            message: 'Deshironi te beni kerkese per anullimin e ketij rezervimi?',
            buttons: [
                {
                    text: 'Jo',
                    handler: () => {
                        console.log('Disagree clicked');
                        this.viewCtrl.dismiss();
                    }
                },
                {
                    text: 'Po',
                    handler: () => {
                        console.log('Agree clicked');
                        this.viewCtrl.dismiss();
                    }
                }
            ]
            });
            confirm.present();
  }
}