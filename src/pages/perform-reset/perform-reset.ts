import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider';
// import { Login } from '../login/login';

/**
 * Generated class for the PerformResetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-perform-reset',
    templateUrl: 'perform-reset.html',
})
export class PerformResetPage {

    error: boolean;
    errorMsg: string;
    password: string;
    confirm: string;
    username: string;
    resetCode: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public toastCtrl: ToastController) {
        this.error = false;
        this.errorMsg = '';
    }

    attemptReset() {
        this.error = false;
        let email = this.navParams.data.email || this.username;
        
        if (!email || !this.password || !this.confirm || !this.resetCode){
            this.error = true;
            this.errorMsg = "Ju lutemi te plotesoni te gjitha fushat."
        }
        else if (this.password !== this.confirm) {
            this.error = true;
            this.errorMsg = "Fjalekalimet nuk perputhen!";
        }
        else {
            this.authProvider.performReset(email, this.resetCode, this.password)
            .then((res) => {
                let toast = this.toastCtrl.create({
                    message: 'Fjalekalimi u ndryshua me sukses.',
                    duration: 3000,
                    position: 'bottom',
                    cssClass: 'green-toast'
                });
                toast.present();
                this.navCtrl.popToRoot();
            })
            .catch((err) => {
                this.error = true;
                this.errorMsg = "Emaili ose Kodi qe ju keni vendosur nuk eshte i sakte."
            })
        }
        
    }




}
