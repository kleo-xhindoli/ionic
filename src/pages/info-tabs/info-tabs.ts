import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Information } from '../information/information';

/**
 * Generated class for the InfoTabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-info-tabs',
    templateUrl: 'info-tabs.html',
})
export class InfoTabs {
    tab1Root: any;
    tab2Root: any;
    bookmarks: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.tab1Root = Information;
        this.tab2Root = Information;
        this.bookmarks = false;
    }

    ionViewDidLoad() {
    }

}
