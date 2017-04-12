import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { Information } from './information';

@NgModule({
  declarations: [
    Information,
  ],
  // imports: [
  //   IonicModule.forChild(Information),
  // ],
  exports: [
    Information
  ]
})
export class InformationModule {}
