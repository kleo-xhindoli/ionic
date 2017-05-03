import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
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
    constructor(public http: Http, public ls: LocalStorage, public api: API) {
        console.log('Hello AuthProvider Provider');
    }

    logIn(username, password) {
        // return new Promise((resolve, reject) => {
        //     this.http.post(this.loginUrl, {username: username, password: password})
        //     .map(res => res.json())
        //     .catch((err) =>{
        //         return Observable.throw(err || 'Server error');
        //     })
        //     .subscribe(data => {
        //         this.ls.setToken(data.token);
        //         resolve(data);
        //     },
        //     err => {
        //         console.log(err);
        //         reject(err);
        //     })
        // });
        return this.api.post(this.loginUrl, {username: username, password: password}).then((data: any) => {
            this.ls.setUser(data.username, data.token, data.fullname);
        })
    }

    register(user, pass, firstname, lastname){
        let userObj = {username: user, password: pass, firstname: firstname, lastname: lastname};
        // return new Promise((resolve, reject) => {
        //     this.http.post(this.registerUrl, userObj)
        //     .map(res => res.json())
        //     .catch((err) =>{
        //         return Observable.throw(err || 'Server error');
        //     })
        //     .subscribe(data => {
        //         console.log(data);
        //         resolve(data);
        //     },
        //     err => {
        //         console.log(err);
        //         reject(err);
        //     })
        // });
        return this.api.post(this.registerUrl, userObj);
    }

}
