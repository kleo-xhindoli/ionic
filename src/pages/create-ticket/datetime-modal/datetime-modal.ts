import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavParams, NavController } from 'ionic-angular';
import { API } from '../../../providers/api'

@Component({
    templateUrl: './datetime-modal.html'
})
export class DateTimeModal {
    intervals: any[];
    serverIntervals: any[];
    nbServices: number; //from nav-params
    location: string; //from nav-params
    hasChosen: boolean;
    minDate: string;
    date: string;
    time: string;
    minTime: string;
    timeBetweenIntervals: number;
    constructor(public viewCtrl: ViewController,
        public navParams: NavParams,
        public navCtrl: NavController,
        public api: API
    ) {
        let d = new Date();
        this.minDate = d.toISOString().split('T')[0];
        this.minTime = `${d.getHours()}:${d.getMinutes()}`;
        this.date = this.minDate;
        this.timeBetweenIntervals = 10;

        this.intervals = this.getIntervals();
        this.nbServices = parseInt(this.navParams.get('nbServices'));
        this.location = this.navParams.get('location');
        console.log(this.location);
        this.hasChosen = false;
        this.recalculate(this.date);

    }

    dismiss() {
        if (this.date && this.time) {
            this.viewCtrl.dismiss({date: this.date, time: this.time});
        }
    }

    choose(interval, index) {
        this.intervals.forEach((item) => {
            if(item.isMine){
                item.active = false;
                item.isMine = false;
            }
        });
        this.intervals.slice(index, index + this.nbServices)
        .forEach((item) => {
            item.active = true;
            item.isMine = true;
        });
        this.hasChosen = true;
        this.time = interval.text;
    }

    recalculate(date){
        let day = new Date(date).getDay();
        if (day == 6 || day == 0) {
            this.date = this.minDate;
        }
        this.intervals = this.getIntervals();
        this.api.get(`/tickets/time-intervals/${date}/${this.location}`)
        .then((vals: any) => {
            console.log(vals);
            this.serverIntervals = vals;
            vals.forEach((i) => {
                let index1 = this.getIndexFromStamp(i.start);
                let index2 = this.getIndexFromStamp(i.end);
                for(let c = index1; c < index2; c++){
                    this.intervals[c].active = true;
                }
            })
            this.intervals.forEach((val, index) => {
                if(!val.active){
                    let canChoose = this.intervals.slice(index, index + this.nbServices)
                    .every((item) => {
                        return !item.active;
                    });
                    val.canChoose = canChoose;
                }
                else {
                    val.canChoose = false;
                }
            })
        })
        .catch((err) => console.log(err));
    }

    getIndexFromStamp(stamp){
        if (!stamp || stamp.length === 0 || !stamp.includes(':')) return -1;
        let index = 0;
        let h = parseInt(stamp.split(':')[0]);
        index = (h - 8) * 60/this.timeBetweenIntervals;
        let m = parseInt(stamp.split(':')[1]);
        index += m / this.timeBetweenIntervals;
        return index;
    }

    _getClosestRoundTime(time) {
        let hour = parseInt(time.split(':')[0]);
        let mins = parseInt(time.split(':')[1]);
        if (mins < this.timeBetweenIntervals) return `${hour}:${this.timeBetweenIntervals}`;
        else if (mins < 60) return `${hour}:${Math.ceil(mins/this.timeBetweenIntervals)*this.timeBetweenIntervals}`;
        else {
            hour++;
            if (hour >= 24) 
                hour = 0
            return `${hour}:00`;
        }
    }

     _padInt(int) {
        if (int < 9) return `0${int}`;
        return int;
    }

    getIntervals(){
        let staticIntervals = [];
        let startHour = 8;
        let endHour = 14;
        let intervalH = startHour;
        let intervalM = 0;
        while(intervalH < endHour) {
            let interval = {
                text: `${this._padInt(intervalH)}:${this._padInt(intervalM)}`,
                active: false,
                canChoose: false
            }
            staticIntervals.push(interval);
            intervalM += this.timeBetweenIntervals;
            if (intervalM >= 60) {
                intervalH++;
                intervalM -= 60;
            }
        }
        if (this.date === this.minDate) {
            let maxDisabledIndex = this.getIndexFromStamp(this._getClosestRoundTime(this.minTime));
            if (maxDisabledIndex <= staticIntervals.length){
                for(let i = 0; i < maxDisabledIndex; i++){
                    staticIntervals[i].active = true;
                }
            }
            else {
                staticIntervals.forEach((interval) => {
                    interval.active = true;
                })
            }
        }
        return staticIntervals;
    }


}