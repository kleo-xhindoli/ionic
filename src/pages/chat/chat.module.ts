import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { Chat } from './chat';

@NgModule({
  declarations: [
    Chat,
  ],
  // imports: [
  //   IonicModule.forChild(Chat),
  // ],
  exports: [
    Chat
  ]
})
export class ChatModule {}
