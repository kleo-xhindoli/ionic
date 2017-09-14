import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FeedbackProvider } from '../../providers/feedback-provider';

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
    difficulty: String;
    suggestions: String;
    comments: String;
    constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public fbProvider: FeedbackProvider) {
        this.rating = 0;
    }

    ionViewDidLoad() {
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
        let feedback = {
            feedbackFor: 'app',
            rating: this.rating,
            wasHelpful: this.didGetService,
            difficulty: this.difficulty,
            suggestions: this.suggestions,
            comments: this.comments
        }
        this.fbProvider.send(feedback)
        .then ((res) => {
            let toast = this.toastCtrl.create({
                message: 'Faleminderit per opinionin tuaj.',
                duration: 3000,
                position: 'bottom',
                cssClass: 'green-toast'
            });
            toast.present();
            this.navCtrl.pop();
        })
        .catch((err) => {
            let toast = this.toastCtrl.create({
                message: 'Feedback-u juaj nuk mund te dergohej per momentin.',
                duration: 3000,
                position: 'bottom',
                cssClass: 'red-toast'
            });
            toast.present();
            this.navCtrl.pop();
        })
    }

}
