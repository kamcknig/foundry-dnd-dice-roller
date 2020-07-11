import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { MacrosPageComponent } from './components/macro-page/macro-page.component'

const routes: Routes = [
  {
    path: '',
    component: MacrosPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MacroRoutingModule { }
