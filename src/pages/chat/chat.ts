import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

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
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log(this.content);
        this.content.scrollToBottom(300);
    }

}
