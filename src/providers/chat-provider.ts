import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { API } from './api';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatProvider {
    private url;
    private socket;
    constructor(public http: Http, public api: API) {
        this.url = this.api.apiUrl;
    }

    sendMessage(data){
        this.socket.emit('message', data);
    }

    getMessages(){
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message', (data) => {
                observer.next(data);    
            });
            return () => {
                this.socket.disconnect();
            };  
        })     
        return observable;
    }

}
