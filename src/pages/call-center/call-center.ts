import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';

/**
 * Generated class for the CallCenter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-call-center',
    templateUrl: 'call-center.html',
})
export class CallCenter {
    phoneNumber: string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.phoneNumber = '118-00'
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CallCenter');
    }

    callAdisa(){
        document.location.href = 'tel:' + this.phoneNumber;
    }

    openChat(){
        this.navCtrl.push(Chat);
    }

}
