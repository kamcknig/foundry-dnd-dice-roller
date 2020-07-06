import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '../../redux/settings.state';
import { selectSetting } from '../../redux/settings.selectors';
import { updateSetting, showUpdateHost } from '../../redux/settings.actions';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent implements OnInit {

  public combatNotifications$: Observable<boolean>;

  constructor(
    private _store$: Store<SettingsState>
  ) { }

  ngOnInit() {
    this.combatNotifications$ = this._store$.pipe<boolean>(select(selectSetting('combat-turn-notification')));
  }

  handleUpdateSetting(setting: string, event: CustomEvent) {
    this._store$.dispatch(updateSetting({ setting, value: event.detail.checked }));
  }

  showUpdateHost(): void {
    this._store$.dispatch(showUpdateHost());
  }
}
