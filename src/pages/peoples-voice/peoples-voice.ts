import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chat } from '../chat/chat';
import { GeneralFeedback } from '../general-feedback/general-feedback';
import { HomePage } from '../home/home';

/**
 * Generated class for the PeoplesVoice page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-peoples-voice',
  templateUrl: 'peoples-voice.html',
})
export class PeoplesVoice {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
    }

    goToPage(page){
        switch(page){
            case 'chat':
                this.navCtrl.push(Chat);
                break;
             case 'feedback':
                this.navCtrl.push(GeneralFeedback);
                break;
            case 'home':
                this.navCtrl.push(HomePage);
                break;
        }
    }

    hasPreviousState() {
        return this.navCtrl.getPrevious()
    }

}
