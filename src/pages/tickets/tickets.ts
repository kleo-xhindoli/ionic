import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Tickets page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-tickets',
    templateUrl: 'tickets.html',
})
export class Tickets {
    dates: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.dates = ['12 March', '14 April', '16 April'];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Tickets');
        console.log(this.dates);
    }

}
