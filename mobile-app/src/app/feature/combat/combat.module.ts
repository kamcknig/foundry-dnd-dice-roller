import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';
import { EffectsModule } from '@ngrx/effects';
import { CombatEffects } from './redux/combat.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocketIoModule,
    EffectsModule.forFeature([CombatEffects])
  ]
})
export class CombatModule {

  constructor() {}
}
