import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FeedbackModal } from './feedback-modal/feedback-modal';
/**
 * Generated class for the InfoSingle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-info-single',
    templateUrl: 'info-single.html',
})
export class InfoSingle {
    card: any;
    location: any;
    uniqueCategories: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.card = {};
    }

    ionViewDidLoad() {
        this.card = this.navParams.data;
        this.location = this.card.applyLocation;
        this.uniqueCategories = this.getUniqueDocCategories(this.card.documents);
    }

    showFeedbackModal() {
        this.navCtrl.push(FeedbackModal);
    }

    getUniqueDocCategories(docs) {
        let allTypes = docs.map(d => d.docType);
        let unique = [];
        allTypes.forEach(type => {
            if (unique.indexOf(type) === -1) {
                unique.push(type);
            }
        });
        return unique;
    }

    getFilteredDocs(cat) {
        return this.card.documents.filter((doc) => {
            return doc.docType === cat;
        })
    }

}
