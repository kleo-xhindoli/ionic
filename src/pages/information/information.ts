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
    showFilters: boolean;
    content: string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.showFilters = false;
        this.content = `<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipisicing elit. Tempore fugit veniam aut repudiandae tempora commodi a laboriosam nobis omnis perspiciatis, eius vel excepturi recusandae numquam vero in, cum rem culpa.`
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

    toggleFilters(){
        this.showFilters = !this.showFilters;
    }

}
