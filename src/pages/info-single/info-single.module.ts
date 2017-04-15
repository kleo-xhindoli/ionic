import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { InfoSingle } from './info-single';

@NgModule({
  declarations: [
    InfoSingle,
  ],
  // imports: [
  //   IonicModule.forChild(InfoSingle),
  // ],
  exports: [
    InfoSingle
  ]
})
export class InfoSingleModule {}
