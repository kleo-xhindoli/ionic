import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tickets } from '../tickets/tickets';
// import { CallCenter } from '../call-center/call-center';
import { InfoTabs } from '../info-tabs/info-tabs';
import { PeoplesVoice } from '../peoples-voice/peoples-voice';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    phoneNumber = '118-00';
    constructor(public navCtrl: NavController,) {

    }

    goToModule(item) {
        switch (item){
            case 'tickets':
                this.navCtrl.push(Tickets);
                break;
            case 'information':
                this.navCtrl.push(InfoTabs);
                break;
            case 'call-center':
                // this.navCtrl.push(CallCenter);
                document.location.href = 'tel:' + this.phoneNumber;
                break;
            case 'peoples-voice':
                this.navCtrl.push(PeoplesVoice);
                break;
            case 'info-desk':
                window.open('http://www.adisa.gov.al/', '_system');
                break;
            default:
                return;
        }
    }

}
