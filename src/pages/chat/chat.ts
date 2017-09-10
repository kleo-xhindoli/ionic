import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';
import { Login } from '../login/login';
import { LocalStorage } from '../../providers/local-storage';
// import * as io from 'socket.io-client';
import { ChatProvider } from '../../providers/chat-provider';

/**
 * Generated class for the Chat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
    // queries: {
    //     content: new ViewChild('content')
    // }
})
export class Chat {
    @ViewChild(Content) content: Content;
    messages: any[];
    socket: any;
    me: any;
    connection: any;
    message: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public ls: LocalStorage,
        public modalCtrl: ModalController,
        public chatProvider: ChatProvider
    ) {
        this.messages = [];

    }

    ionViewDidEnter() {
        if(!this.ls.isLogged()){
            let contactModal = this.modalCtrl.create(Login);
            contactModal.present();
            contactModal.onDidDismiss(() => {
                this.me = {
                    username: this.ls.getUsername(),
                    fullname: this.ls.getFullname()
                };
                this.connection = this.chatProvider.getMessages().subscribe((message: any) => {
                    let newMsg = {
                        sender: message.sender.fullname,
                        message: message.message,
                        isMine: message.sender.username === this.me.username,
                        date: new Date()
                    };
                    this.messages.push(newMsg);
                })
            })
        }
        // this.content.scrollToBottom(300);

        else {
            // this.messages = [
            //     {
            //         sender: 'Kleo Xhindoli',
            //         message: 'Hello World',
            //         isMine: true,
            //         date: new Date()
            //     },
            //     {
            //         sender: 'Lefter Probduari',
            //         message: 'Hello too',
            //         isMine: false,
            //         date: new Date()
            //     }
            // ];
            this.me = {
                username: this.ls.getUsername(),
                fullname: this.ls.getFullname()
            };
            this.connection = this.chatProvider.getMessages().subscribe((message: any) => {
                let newMsg = {
                    sender: message.sender.fullname,
                    message: message.message,
                    isMine: message.sender.username === this.me.username,
                    date: new Date()
                };
                this.messages.push(newMsg);
            })
        }

        
    }

    sendMessage(){
        let obj = {
            sender: {
                fullname: this.me.fullname,
                username: this.me.username
            },
            message: this.message,
        }
        console.log(obj);
        this.message = '';
        this.chatProvider.sendMessage(obj);
    }



}
