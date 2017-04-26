import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';
import { Login } from '../login/login';
import { LocalStorage } from '../../providers/local-storage'

/**
 * Generated class for the Chat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
    // queries: {
    //     content: new ViewChild('content')
    // }
})
export class Chat {
    @ViewChild(Content) content: Content;
    constructor(public navCtrl: NavController, public navParams: NavParams, public ls: LocalStorage, public modalCtrl: ModalController) {
    }

    ionViewDidEnter() {
        if(!this.ls.isLogged()){
            let contactModal = this.modalCtrl.create(Login);
            contactModal.present();
        }
        // this.content.scrollToBottom(300);
    }

}
