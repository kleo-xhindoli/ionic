import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { Register } from './register';

@NgModule({
  declarations: [
    Register,
  ],
  // imports: [
  //   IonicModule.forChild(Register),
  // ],
  exports: [
    Register
  ]
})
export class RegisterModule {}
