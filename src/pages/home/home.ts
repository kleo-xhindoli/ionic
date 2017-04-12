import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tickets } from '../tickets/tickets';
import { InfoTabs } from '../info-tabs/info-tabs';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) {

    }

    goToModule(item) {
        switch (item){
            case 'tickets':
                this.navCtrl.push(Tickets);
                break;
            case 'information':
                this.navCtrl.push(InfoTabs);
                break;
            default:
                return;
        }
    }

}
