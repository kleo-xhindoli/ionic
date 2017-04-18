import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tickets } from '../tickets/tickets';
import { Login } from '../login/login';
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
                // this.navCtrl.push(Tickets);
                this.navCtrl.push(Login);
                break;
            case 'information':
                this.navCtrl.push(InfoTabs);
                break;
            default:
                return;
        }
    }

}
