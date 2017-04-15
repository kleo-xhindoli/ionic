import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.card = {};
    }

    ionViewDidLoad() {
        this.card = this.navParams.data;
    }

}
