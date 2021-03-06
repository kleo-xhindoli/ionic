import { Injectable, EventEmitter } from '@angular/core';
// import { Http } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';
// import {Observable} from 'rxjs/Rx';
import { API } from './api'
import { LocalStorage } from './local-storage'

/*
  Generated class for the TicketsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TicketsProvider {
    data: any[];
    url = '/tickets';
    ticketDeleted: any;

    constructor(public api: API, public ls: LocalStorage) {
        this.ticketDeleted = new EventEmitter();
    }

    getTickets(){
        if(this.data){
            return Promise.resolve(this.data);
        }
        else {
            // return new Promise(resolve => {
            //     this.http.get(this.url)
            //     .map(res => res.json())
            //     .catch((err) =>{
            //         return Observable.throw(err || 'Server error');
            //     })
            //     .subscribe(data => {
            //         this.data = data;
            //         resolve(this.data);
            //     },
            //     err => {
            //         this.data = this.getDummyData();
            //         console.log(err);
            //         resolve(this.data);
            //     })
            // });
            return this.api.get(this.url).then((tickets: any) => {
                this.data = tickets;
                return tickets;
            })
            .catch((err) => {
                console.log(err);
                this.data = this.getDummyData();
                return this.data;
            })
        }
    }

    create(ticket) {
        if (!ticket.status){
            ticket.status = "Aprovuar";
        }
        if (!ticket.createdBy){
            ticket.createdBy = this.ls.getUserId();
        }
        // let body = JSON.stringify(ticket);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return new Promise((resolve, reject) => {
        //     this.http.post(this.url, body, options)
        //     .map(res => res.json())
        //     .catch((err) =>{
        //         return Observable.throw(err.json().error || 'Server error');
        //     })
        //     .subscribe(data => {
        //         console.log(data);
        //         this.data.push(data);
        //         resolve(data);
        //     },
        //     err => {
        //         reject(err);
        //     })
        // });
        return this.api.post(this.url, ticket).then((ticket) => {
            this.data.push(ticket);
            return ticket;
        })
    }

    cancel(id){
        let ticket = this.getById(id);
        ticket.status = 'Anulluar';

        // let body = JSON.stringify(ticket);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return new Promise((resolve, reject) => {
        //     this.http.put(this.url + `/${id}`, body, options)
        //     .map(res => res.json())
        //     .catch((err) =>{
        //         return Observable.throw(err.json().error || 'Server error');
        //     })
        //     .subscribe(data => {
        //         console.log(data);
        //         resolve(data);
        //     },
        //     err => {
        //         reject(err);
        //     })
        // });
        if(ticket)
            return this.api.put(`${this.url}/${id}`, ticket);
        else {
            return new Promise((resolve, reject) => {
                reject('Invalid ID');
            })
        } 
    }

    delete(id) {
        let index = this.getIndexById(id);
        if (index !== -1){
            return this.api.delete(`${this.url}/${id}`)
            .then((result) => {
                this.data.splice(index, 1);
                this.ticketDeleted.emit(result);
                return result;
            });

        }
        else {
            return new Promise((resolve, reject) => {
                reject('Invalid ID');
            })
        }
    }

    getById(id) {
        if(this.data) {
            return this.data.find((el) => { return el._id === id });
        }
    }

    getIndexById(id) {
        if(this.data) {
            return this.data.findIndex((el) => { return el._id === id });
        }
    }

    getDummyData(){
        return [];
    }

}
