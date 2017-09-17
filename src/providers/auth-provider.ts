import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Headers, RequestOptions } from '@angular/http';
// import {Observable} from 'rxjs/Rx';
import { LocalStorage } from './local-storage'
import { API } from './api'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
    loginUrl = '/users/login'
    registerUrl = '/users/register'
    requestResetUrl = '/users/requestReset'
    performResetUrl = '/users/resetPassword'
    constructor(public http: Http, public ls: LocalStorage, public api: API) {
    }

    logIn(username, password) {
        return this.api.post(this.loginUrl, {username: username, password: password}).then((data: any) => {
            this.ls.setUser(data.username, data.token, data.fullname, data.id);
        })
    }

    register(user, pass, firstname, lastname, tel, cardId){
        let userObj = {
            username: user, 
            password: pass, 
            firstname: firstname, 
            lastname: lastname, 
            tel: tel, 
            cardId: cardId
            // birthday: birthday
        };
        return this.api.post(this.registerUrl, userObj);
    }

    requestReset(user) {
        return this.api.post(this.requestResetUrl, {username: user});
    }

    performReset(email, code, password) {
        let data = {
            username: email,
            resetCode: code,
            password: password
        };
        return this.api.post(this.performResetUrl, data);
    }  

}
