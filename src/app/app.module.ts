import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Tickets } from '../pages/tickets/tickets';
import { Ticket } from '../pages/tickets/ticket/ticket';
import { PopoverPage } from '../pages/tickets/ticket/pop-over';
import { CreateTicket } from '../pages/create-ticket/create-ticket';
import { Information } from '../pages/information/information';
import { InfoTabs } from '../pages/info-tabs/info-tabs';
import { InfoSingle } from '../pages/info-single/info-single';
import { FeedbackModal } from '../pages/info-single/feedback-modal/feedback-modal';
import { Login } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';

import { TicketsProvider } from '../providers/tickets-provider';
import { InfoCardsProvider } from '../providers/info-cards-provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Tickets,
    Ticket,
    PopoverPage,
    CreateTicket,
    Information,
    InfoTabs,
    InfoSingle,
    FeedbackModal,
    Login
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Tickets,
    Ticket,
    PopoverPage,
    CreateTicket,
    Information,
    InfoTabs,
    InfoSingle,
    FeedbackModal,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TicketsProvider,
    InfoCardsProvider
  ]
})
export class AppModule {}
