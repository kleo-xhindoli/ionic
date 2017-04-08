import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tickets } from '../tickets/tickets';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) {

    }

    itemSelected(item) {
        this.navCtrl.push(Tickets);
    }

}
