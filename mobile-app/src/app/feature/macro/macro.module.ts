import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { MacroEffects } from './redux/macro.effects';
import { MacrosPageComponent } from './components/macro-page/macro-page.component';
import { MacroRoutingModule } from './macro-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    MacrosPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MacroRoutingModule,
    MatExpansionModule,
    EffectsModule.forFeature([MacroEffects])
  ]
})
export class MacroModule { }
