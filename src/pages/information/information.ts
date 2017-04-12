import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Information page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-information',
    templateUrl: 'information.html',
})
export class Information {
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Information');
    }

    ionViewDidEnter() {
        console.log(this.navParams.data);

    }

    getItems(ev){
        console.log(ev);
    }

}
