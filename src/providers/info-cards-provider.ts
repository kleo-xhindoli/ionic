import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

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
    constructor(public http: Http, public storage: Storage, public api: API) {
        this.bookmarks = [];
        this.bookmarkIds = [];
        this.url = '/infocards';
    }

    getInfoCards(){
        // return new Promise((resolve, reject) => {
        //     this.infoCards = this.getDummyCards();
        //     resolve(this.infoCards);
        // })
        if(this.infoCards){
            return Promise.resolve(this.infoCards);
        }
        else {            
            // return new Promise(resolve => {
            //     this.http.get(this.url)
            //     .map(res => res.json())
            //     .catch((err) =>{
            //         return Observable.throw(err || 'Server error');
            //     })
            //     .subscribe(data => {
            //         this.infoCards = data;
            //         resolve(this.infoCards);
            //     },
            //     err => {
            //         this.infoCards = this.getDummyCards();
            //         console.log(err);
            //         resolve(this.infoCards);
            //     })
            // });
            return this.api.get(this.url).then((cards: any) => {
                this.infoCards = cards;
                return cards;
            })
            .catch((err) => {
                console.log(err);
                this.infoCards = this.getDummyCards();
                return this.infoCards;
            })
        }
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

}
