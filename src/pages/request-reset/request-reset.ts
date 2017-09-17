import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider';
import { PerformResetPage } from '../perform-reset/perform-reset'

/**
 * Generated class for the RequestResetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-request-reset',
    templateUrl: 'request-reset.html',
})
export class RequestResetPage {

    error: boolean;
    username: string;
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public authProvider: AuthProvider,
        public toastCtrl: ToastController
    ) {
        this.error = false;
    }

    requestReset() {
        this.error = false;
        this.authProvider.requestReset(this.username)
        .then((res) => {
            let toast = this.toastCtrl.create({
                message: 'Email-i u dergua me sukses. Ju lutemi te kontrolloni inbox-in tuaj, si dhe skedarin \'spam\'.',
                duration: 5000,
                position: 'bottom',
                cssClass: 'green-toast'
            });
            toast.present();
            this.performResetPage(this.username);
        })
        .catch((err) => {
            this.error = true;
        })
    }

    performResetPage(email) {
        if (email) {
            this.navCtrl.push(PerformResetPage, {email});
        }
        else {
            this.navCtrl.push(PerformResetPage);
        }
    }
}
