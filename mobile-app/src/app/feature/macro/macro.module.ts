import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { MacroEffects } from './redux/macro.effects';
import { MacroDialogComponent } from './components/macro-dialog/macro-dialog.component';

@NgModule({
  declarations: [
    MacroDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([MacroEffects])
  ],
  exports: [
    MacroDialogComponent
  ]
})
export class MacroModule { }
