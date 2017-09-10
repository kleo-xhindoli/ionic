import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { API } from './api'

/*
  Generated class for the FeedbackProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FeedbackProvider {

    constructor(public http: Http, public api: API) {
    }

    send(feedback) {
        return this.api.post('/feedback', feedback);
    }

}
