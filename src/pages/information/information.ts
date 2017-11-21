import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { InfoSingle } from '../info-single/info-single';
import { InfoCardsProvider } from '../../providers/info-cards-provider';

/**
 * Generated class for the Information page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-information',
    templateUrl: 'information.html',
})
export class Information {
    showFilters: boolean;
    content: string;
    closingFilters: boolean;
    infoCards: any[];
    filteredCards: any[];
    filters: any;
    noFiltersState: any;
    loader: any;
    uniqueInstitutions: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public infoProvider: InfoCardsProvider,
        public loadingCtrl: LoadingController
    ) {
        this.showFilters = false;
        this.closingFilters = false;
        this.infoCards = [];
        this.noFiltersState = {
            search: '',
            responsibleInstitution: ''
        };
        this.filters = {
            search: '',
            responsibleInstitution: ''
        };
        this.uniqueInstitutions = [];
        if (!this.loader) {
            this.loader = this.loadingCtrl.create({
                content: 'Ju lutem prisni...',
                // dismissOnPageChange: true
            });
        }
        this.loader.present().catch(() => { });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Information');
    }

    ionViewDidEnter() {
        this.updateView();
    }

    getItems(ev) {
        // console.log(ev);
        this.applyFilters();
    }

    showSingleFor(card) {
        this.navCtrl.push(InfoSingle, card);
    }

    isBookmark(id) {
        if (this.infoProvider.bookmarkIds.indexOf(id.toString()) == -1)
            return false;
        return true;
    }

    toggleFilters(state) {
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
                this.loadMore(null, 0);
            }, 300);
        }
    }

    toggleBookmark(ev, id) {
        ev.stopPropagation();
        this.infoProvider.bookmark(id).then(() => {
            this.updateView();
        })
    }

    updateView() {
        if (this.navParams.data.isBookmarks === false) {
            this.infoProvider.getInfoCards()
                .then((data: any[]) => {
                    this.infoCards = data;
                    this.getUniqueInstitutions();
                    this.filteredCards = JSON.parse(JSON.stringify(this.infoCards));
                    if (this.loader) {
                        this.loader.dismiss()
                            .then(() => this.loader = undefined)
                            .catch(() => this.loader = undefined);
                    }
                });
        }
        else {
            this.infoProvider.getBookmarks()
                .then((bookmarks) => {
                    this.infoCards = bookmarks;
                    this.filteredCards = JSON.parse(JSON.stringify(this.infoCards));
                    this.getUniqueInstitutions();
                    if (this.loader) {
                        this.loader.dismiss()
                            .then(() => this.loader = undefined)
                            .catch(() => this.loader = undefined);
                    }
                });
        }
        this.infoProvider.setBookmarkIds();
    }

    applyFilters() {
        this.filteredCards = JSON.parse(JSON.stringify(this.infoCards));
        this.filteredCards = this.filteredCards.filter((card) => {
            let regex = new RegExp(this.filters.search, 'i');
            return (card.title.search(regex) !== -1) ||
                (card.description.search(regex) !== -1) ||
                (card.content.search(regex) !== -1);

        })
            .filter((card) => {
                if (this.filters.responsibleInstitution.length === 0) return true;
                else {
                    return this.filters.responsibleInstitution === card.responsibleInstitution;
                }
            })
        // .filter((card) => {
        //     if(this.filters.subcategory.length === 0) return true;
        //     else {
        //         return this.filters.subcategory === card.subcategory;
        //     }
        // });
    }

    hasFilters() {
        return !(JSON.stringify(this.filters) === JSON.stringify(this.noFiltersState));
    }

    clearFilters() {
        this.filters = JSON.parse(JSON.stringify(this.noFiltersState));
        this.updateView();
        this.applyFilters();
    }

    getUniqueInstitutions() {
        return this.infoProvider.getUniqueInstitutions().then((inst) => {
            this.uniqueInstitutions = inst;
        })
    }

    loadMore(infiniteScroll, limit) {
        console.log('get more data');
        return this.infoProvider.getMoreCards(limit).then((cards: any) => {
            this.infoCards = cards;
            this.applyFilters();
            if (infiniteScroll)
                infiniteScroll.complete();
        })
    }

    loadMoreBookmarks(infiniteScroll) {
        this.infoProvider.getMoreBookmarks(0).then((cards: any) => {
            this.infoCards = cards;
            this.applyFilters();
            infiniteScroll.complete();
        })
    }

}
