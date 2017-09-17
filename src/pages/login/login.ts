import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';

import { Register } from '../register/register';
import { HomePage } from '../home/home';
import { RequestResetPage } from '../request-reset/request-reset';
import { AuthProvider } from '../../providers/auth-provider';
import { LocalStorage } from '../../providers/local-storage';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {

    username: string;
    password: string;
    error: boolean;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public auth: AuthProvider, 
        public ls: LocalStorage, 
        public viewCtrl: ViewController,
        public modalCtrl: ModalController,
        public loadingCtrl: LoadingController
    ) {
        this.error = false
    }


    registerPage() {
        let contactModal = this.modalCtrl.create(Register);
            contactModal.present();
    }

    forgotPassword() {
        this.navCtrl.push(RequestResetPage);
    }

    login() {
        let loader = this.loadingCtrl.create({
            content: "Ju lutem prisni...",
        });
        this.auth.logIn(this.username, this.password).then((result) => {
            loader.dismiss();
            this.viewCtrl.dismiss();
        })
        .catch((err) => {
            loader.dismiss();
            this.error = true;
            console.log(err);
        })
    }

    dismiss() {
        this.navCtrl.push(HomePage);
    }

}
