import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Login } from '../login/login';
import { AuthProvider } from '../../providers/auth-provider';
/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class Register {

    username: string;
    password: string;
    firstname: string;
    lastname: string;
    confirm: string;
    // birthday: string;
    tel: string;
    cardId: string;
    error: boolean;
    errorStr: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public auth: AuthProvider) {
        this.error = false;
        this.errorStr = 'Pati nje problem gjate krijimit te llogarise.'
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Register');
    }

    loginPage(){
        this.dismiss();
    }

    register() {
        if (this.password !== this.confirm){
            this.errorStr = 'Password-et nuk perputhen!'
            this.error = true;
        }
        else {
            this.auth.register(
                this.username, 
                this.password, 
                this.firstname, 
                this.lastname,
                this.tel,
                this.cardId
                // this.birthday
            ).then(() => {
                this.dismiss()
            })
            .catch(() => {
                this.errorStr = 'Pati nje problem gjate krijimit te llogarise.';
                this.error = true;
            })
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
