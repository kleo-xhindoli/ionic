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
    }

    setKey(key, val) {
        localStorage.setItem(key, val);
    }

    getKey(key) {
        return localStorage.getItem(key);
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

    setUser(username, token ,fullname, id){
        this.setToken(token);
        this.setKey('username', username);
        this.setKey('fullname', fullname);
        this.setKey('userid', id);
    }

    getUsername(){
        return this.getKey('username');
    }

    getFullname(){
        return this.getKey('fullname');
    }

    getUserId(){
        return this.getKey('userid');
    }

}
