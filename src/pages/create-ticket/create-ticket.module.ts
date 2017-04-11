import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTicket } from './create-ticket';

@NgModule({
  declarations: [
    CreateTicket,
  ],
  // imports: [
  //   IonicPageModule.forChild(CreateTicket),
  // ],
  exports: [
    CreateTicket
  ]
})
export class CreateTicketModule {}
