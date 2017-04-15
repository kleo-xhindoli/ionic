import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InfoSingle } from '../info-single/info-single';
import { InfoCardsProvider } from '../../providers/info-cards-provider';

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
    showFilters: boolean;
    content: string;
    closingFilters: boolean;
    infoCards: any[];
    constructor(public navCtrl: NavController, public navParams: NavParams, public infoProvider: InfoCardsProvider) {
        this.showFilters = false;
        this.closingFilters = false;
        this.infoCards = [];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Information');
    }

    ionViewDidEnter() {
        // console.log(this.navParams.data);
        this.infoProvider.getInfoCards()
        .then((data: any[]) => {
            this.infoCards = data;
        })

    }

    getItems(ev){
        console.log(ev);
    }

    showSingleFor(card){
        this.navCtrl.push(InfoSingle, card);
    }

    toggleFilters(state){
        if (!state)
            this.showFilters = !this.showFilters;
        else if (state === 'open') {
            this.showFilters = true;
        }
        else {
            this.closingFilters = true;
            setTimeout(() => {
                this.showFilters = false;
                this.closingFilters = false;
            }, 300);
        }
    }

}
