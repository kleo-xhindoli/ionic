import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalStorage {
    token: string;
    constructor(public http: Http) {
        console.log('Hello LocalStorage Provider');
    }

    setKey(key, val) {
        localStorage.setItem(key, val);
    }

    getKey(key) {
        localStorage.getItem(key);
    }

    setToken(access_token) {
        this.token = access_token;
        this.setKey('token', access_token);
    }

    getToken(){
        return this.token;
    }

    isLogged() {
        if (this.token)
            return true;
        return false;
    }

}
