import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FeedbackModal } from './feedback-modal/feedback-modal';
/**
 * Generated class for the InfoSingle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-info-single',
    templateUrl: 'info-single.html',
})
export class InfoSingle {
    card: {};
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.card = {};
    }

    ionViewDidLoad() {
        this.card = this.navParams.data;
    }

    showFeedbackModal() {
        this.navCtrl.push(FeedbackModal);
    }

}
