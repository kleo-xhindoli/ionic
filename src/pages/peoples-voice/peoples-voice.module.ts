import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { PeoplesVoice } from './peoples-voice';

@NgModule({
  declarations: [
    PeoplesVoice,
  ],
  // imports: [
  //   IonicModule.forChild(PeoplesVoice),
  // ],
  exports: [
    PeoplesVoice
  ]
})
export class PeoplesVoiceModule {}
