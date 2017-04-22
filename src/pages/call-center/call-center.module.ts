import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { CallCenter } from './call-center';

@NgModule({
  declarations: [
    CallCenter,
  ],
  // imports: [
  //   IonicModule.forChild(CallCenter),
  // ],
  exports: [
    CallCenter
  ]
})
export class CallCenterModule {}
