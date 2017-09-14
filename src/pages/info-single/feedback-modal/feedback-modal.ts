import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AlertController, NavParams, NavController, ToastController } from 'ionic-angular';

@Component({
    templateUrl: './feedback-modal.html'
})
export class FeedbackModal {
    constructor(public viewCtrl: ViewController, 
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public navCtrl: NavController,
        public toastCtrl: ToastController
    ) {}

    dismiss() {
        console.log('closing');
        this.navCtrl.pop();
    }

    thankAndDismiss() {
        let toast = this.toastCtrl.create({
            message: 'Faleminderit per opinionin tuaj.',
            duration: 3000,
            position: 'bottom',
            cssClass: 'green-toast'
        });
        toast.present();
        this.dismiss();
    }

    
}