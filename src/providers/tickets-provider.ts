import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the TicketsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TicketsProvider {
    data: any[];
    url = 'http://52.166.71.231:3000/tickets';

    constructor(public http: Http) {
    }

    getTickets(){
        if(this.data){
            return Promise.resolve(this.data);
        }
        else {            
            return new Promise(resolve => {
                this.http.get(this.url)
                .map(res => res.json())
                .catch((err) =>{
                    return Observable.throw(err || 'Server error');
                })
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                },
                err => {
                    this.data = this.getDummyData();
                    console.log(err);
                    resolve(this.data);
                })
            });
        }
    }

    create(ticket) {
        if (!ticket.status){
            ticket.status = "Ne pritje per aprovim";
        }
        let body = JSON.stringify(ticket);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            this.http.post(this.url, body, options)
            .map(res => res.json())
            .catch((err) =>{
                return Observable.throw(err.json().error || 'Server error');
            })
            .subscribe(data => {
                console.log(data);
                this.data.push(data);
                resolve(data);
            },
            err => {
                reject(err);
            })
        });
    }

    cancel(id){
        let ticket = this.getById(id);
        ticket.status = 'Ne pritje per anullim';

        let body = JSON.stringify(ticket);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            this.http.put(this.url + `/${id}`, body, options)
            .map(res => res.json())
            .catch((err) =>{
                return Observable.throw(err.json().error || 'Server error');
            })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            },
            err => {
                reject(err);
            })
        });

    }

    getById(id) {
        if(this.data) {
            return this.data.find((el) => { return el.id === id });
        }
    }

    getDummyData(){
        return [
            {
                id: 0,
                date: '2017-02-14',
                time: '12:00',
                location: 'Rr e Barrikadave, Tirane',
                status: 'Aprovuar'
            },
            {
                id: 1,
                date: '2017-02-14',
                time: '14:30',
                location: 'Rr e Barrikadave, Tirane',
                status: 'Ne pritje per aprovim'
            },
            {
                id: 2,
                date: '2017-03-08',
                time: '14:00',
                location: 'Rr e Barrikadave, Tirane',
                status: 'Ne pritje per anullim'
            },
            {
                id: 3,
                date: '2017-04-12',
                time: '11:00',
                location: 'Rr e Barrikadave, Tirane',
                status: 'Anulluar'
            }
        ];
    }

}
