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
    nbServices: number;
    hasChosen: boolean;
    minDate: string;
    date: string;
    time: string;
    constructor(public viewCtrl: ViewController,
        public navParams: NavParams,
        public navCtrl: NavController,
        public api: API
    ) {
        this.intervals = this.getIntervals();
        this.nbServices = parseInt(this.navParams.get('nbServices'))
        this.hasChosen = false;
        this.minDate = new Date().toISOString().split('T')[0];
        this.date = this.minDate;
        this.recalculate(this.date);



    }

    dismiss() {
        this.viewCtrl.dismiss({date: this.date, time: this.time});
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
        this.intervals = this.getIntervals();
        this.api.get(`/tickets/time-intervals/${date}`)
        .then((vals: any) => {
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
        index = (h - 8) * 3;
        let m = parseInt(stamp.split(':')[1]);
        index += m / 20;
        return index;
    }

    getIntervals(){
        return [
            {
                text: '08:00',
                active: false,
                canChoose: false
            },
            {
                text: '08:20',
                active: false,
                canChoose: false
            },
            {
                text: '08:40',
                active: false,
                canChoose: false
            },
            {
                text: '09:00',
                active: false,
                canChoose: false
            },
            {
                text: '09:20',
                active: false,
                canChoose: false
            },
            {
                text: '09:40',
                active: false,
                canChoose: false
            },
            {
                text: '10:00',
                active: false,
                canChoose: false
            },
            {
                text: '10:20',
                active: false,
                canChoose: false
            },
            {
                text: '10:40',
                active: false,
                canChoose: false
            },
            {
                text: '11:00',
                active: false,
                canChoose: false
            },
            {
                text: '11:20',
                active: false,
                canChoose: false
            },
            {
                text: '11:40',
                active: false,
                canChoose: false
            },
            {
                text: '12:00',
                active: false,
                canChoose: false
            },
            {
                text: '12:20',
                active: false,
                canChoose: false
            },
            {
                text: '12:40',
                active: false,
                canChoose: false
            },
            {
                text: '13:00',
                active: false,
                canChoose: false
            },
            {
                text: '13:20',
                active: false,
                canChoose: false
            },
            {
                text: '13:40',
                active: false,
                canChoose: false
            },
            {
                text: '14:00',
                active: false,
                canChoose: false
            },
            {
                text: '14:20',
                active: false,
                canChoose: false
            },
            {
                text: '14:40',
                active: false,
                canChoose: false
            },
            {
                text: '15:00',
                active: false,
                canChoose: false
            },
            {
                text: '15:20',
                active: false,
                canChoose: false
            },
            {
                text: '15:40',
                active: false,
                canChoose: false
            }
        ];
    }


}