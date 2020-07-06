import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { settingsStateKey } from './redux/settings.state';
import { settingsReducer } from './redux/settings.reducer';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './redux/settings.effects';
import { UpdateHostDialogComponent } from './components/update-host-dialog/update-host-dialog.component';

@NgModule({
  declarations: [
    SettingsMenuComponent,
    UpdateHostDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(settingsStateKey, settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ],
  exports: [
    SettingsMenuComponent,
    UpdateHostDialogComponent
  ]
})
export class SettingsModule { }
