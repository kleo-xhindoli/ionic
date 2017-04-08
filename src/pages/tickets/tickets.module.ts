import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Tickets } from './tickets';

@NgModule({
  declarations: [
    Tickets,
  ],
  // imports: [
  //   IonicModule.forChild(Tickets),
  // ],
  exports: [
    Tickets,
  ]
})
export class TicketsModule {}
