import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AlertController, NavParams, NavController, ToastController } from 'ionic-angular';
import { FeedbackProvider } from '../../../providers/feedback-provider';

@Component({
    templateUrl: './feedback-modal.html'
})
export class FeedbackModal {
    wasHelpful : boolean;
    cardId : string;
    suggestions: string;
    constructor(public viewCtrl: ViewController, 
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public fbProvider: FeedbackProvider
    ) {
        this.cardId = this.navParams.get('cardId');
    }

    dismiss() {
        console.log('closing');
        this.navCtrl.pop();
    }

    thankAndDismiss() {
        let feedback = {
            feedbackFor: 'Kartele',
            cardId: this.cardId,
            wasHelpful: this.wasHelpful,
            suggestions: this.suggestions
        }

        this.fbProvider.send(feedback)
        .then((data) => {
            let toast = this.toastCtrl.create({
                message: 'Faleminderit per opinionin tuaj.',
                duration: 3000,
                position: 'bottom',
                cssClass: 'green-toast'
            });
            toast.present();
            this.dismiss();
        })
    }

    thumbsUp() {
        this.wasHelpful = true;
    }

    thumbsDown() {
        this.wasHelpful = false;
    }

    
}