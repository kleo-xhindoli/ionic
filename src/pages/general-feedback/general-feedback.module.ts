import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { GeneralFeedback } from './general-feedback';

@NgModule({
  declarations: [
    GeneralFeedback,
  ],
  // imports: [
  //   IonicModule.forChild(GeneralFeedback),
  // ],
  exports: [
    GeneralFeedback
  ]
})
export class GeneralFeedbackModule {}
