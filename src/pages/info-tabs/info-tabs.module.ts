import { NgModule } from '@angular/core';
// import { IonicModule } from 'ionic-angular';
import { InfoTabs } from './info-tabs';

@NgModule({
  declarations: [
    InfoTabs,
  ],
  // imports: [
  //   IonicModule.forChild(InfoTabs),
  // ],
  exports: [
    InfoTabs
  ]
})
export class InfoTabsModule {}
