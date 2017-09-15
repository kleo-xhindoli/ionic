import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
// import { Headers, RequestOptions } from '@angular/http';
// import {Observable} from 'rxjs/Rx';

import { API } from './api';

/*
  Generated class for the InfoCardsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InfoCardsProvider {
    infoCards: any[];
    bookmarks: any[];
    bookmarkIds: string[];
    url: string;
    batchSize: number;
    currentIndex: number;
    canGet: boolean;
    constructor(public http: Http, public storage: Storage, public api: API) {
        this.bookmarks = [];
        this.bookmarkIds = [];
        this.url = '/infocards';
        this.batchSize = 20;
        this.currentIndex = 0;
        this.canGet = true;
        this.infoCards = [];
    }

    getInfoCards(){
        // return this.api.get(this.url).then((cards: any) => {
        //     this.infoCards = cards;
        //     return cards;
        // })
        // .catch((err) => {
        //     console.log(err);
        //     this.infoCards = this.getDummyCards();
        //     return this.infoCards;
        // })
        if (!this.canGet) return;
        this.currentIndex = 0;
        this.infoCards = [];
        console.log('getting info cards');
        return this.getMoreCards();
    }

    bookmark(id) {
        console.log(id);
        if(this.bookmarkIds.indexOf(id.toString()) === -1){
            return this.storage.ready().then(() => {
                return this.storage.set(id.toString(), true);
            })
        }
        else {
            return this.storage.ready()
            .then(() => {
                return this.storage.remove(id.toString());
            })
        }
    }

    getBookmarks() {
        if(!this.infoCards){
            return this.getInfoCards().then(() => {
                return this.getBookmarks();
            })
        }
        this.bookmarks = [];
        return this.storage.ready()
        .then(() => {
            return this.storage.keys().then((keys) => {
                keys.forEach((key) => {
                    let el =this.infoCards.find((card) => {
                        return card._id == key;
                    });
                    if(el) this.bookmarks.push(el);
                });
                return this.bookmarks;
            })
        })
    }

    setBookmarkIds() {
        return this.storage.ready()
        .then(() => {
            this.storage.keys()
            .then((keys) => {
                this.bookmarkIds = keys;
            })
        })
    }

    getDummyCards(){
        return [
            
        ]
    }

    getUniqueInstitutions() {
        return this.api.get(`${this.url}/institutions`).then((institutions: any) => {
            return institutions;
        })
    }

    getMoreCards(limit) {
        if (!this.canGet) return;
        this.canGet = false;
        if (limit === null || typeof limit === 'undefined')
            limit = this.batchSize;
        console.log(this.currentIndex);
        console.log(limit);
        return this.api.get(`${this.url}/${this.currentIndex}/${limit}`)
        .then((cards: any) => {
            this.infoCards = this.infoCards.concat(cards);
            this.currentIndex += this.batchSize;
            this.canGet = true;
            return this.infoCards;
        })
        .catch((err) => {
            console.log(err);
            this.canGet = true;
        })
    }

    getMoreBookmarks(limit) {
        return this.getMoreCards(limit).then(() => {
            return this.getBookmarks();
        })
    }

}
