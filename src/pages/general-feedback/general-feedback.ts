import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the GeneralFeedback page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-general-feedback',
  templateUrl: 'general-feedback.html',
})
export class GeneralFeedback {
    rating: Number;
    didGetService: Boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
        this.rating = 0;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GeneralFeedback');
    }

    getStarIconForRating(rating){
        return this.rating >= rating ? 'star' : 'star-outline';

    }

    setRating(rating){
        this.rating = rating;
    }

    thumb(direction){
        if (direction === 'up'){
            this.didGetService = true;
        }
        else {
            this.didGetService = false;
        }
    }

    thankAndDismiss() {
        let toast = this.toastCtrl.create({
            message: 'Faleminderit per feedback-un tuaj.',
            duration: 3000,
            position: 'bottom',
            cssClass: 'green-toast'
        });
        toast.present();
        this.navCtrl.pop();
    }

}
