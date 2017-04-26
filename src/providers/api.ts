import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { LocalStorage } from './local-storage'
/*
  Generated class for the API provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class API {

    apiUrl = 'http://localhost:3000';
    constructor(public http: Http, public ls: LocalStorage) {
        console.log('Hello API Provider');
    }

    get(route){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        if (this.ls.getToken()){
            headers.append('x-access-token', this.ls.getToken());
        }
        let opt = new RequestOptions({headers: headers});
        console.log(opt);
        return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl + route, opt)
            .map(res => res.json())
            .catch((err) =>{
                return Observable.throw(err || 'Server error');
            })
            .subscribe(data => {
                resolve(data);
            },
            err => {
                reject(err);
            })
        });
    }

    post(route, req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        if (this.ls.getToken()){
            headers.append('x-access-token', this.ls.getToken());
        }
        let opt = new RequestOptions({headers: headers});
        console.log(opt);
        // req = JSON.stringify(req);
        console.log(req);
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + route, req, opt)
            .map(res => res.json())
            .catch((err) =>{
                return Observable.throw(err || 'Server error');
            })
            .subscribe(data => {
                resolve(data);
            },
            err => {
                reject(err);
            })
        });
    }

    put(route, req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        if (this.ls.getToken()){
            headers.append('x-access-token', this.ls.getToken());
        }
        let opt = new RequestOptions({headers: headers});
        // req = JSON.stringify(req);
        return new Promise((resolve, reject) => {
            this.http.put(this.apiUrl + route, req, opt)
            .map(res => res.json())
            .catch((err) =>{
                return Observable.throw(err || 'Server error');
            })
            .subscribe(data => {
                resolve(data);
            },
            err => {
                reject(err);
            })
        });
    }


}