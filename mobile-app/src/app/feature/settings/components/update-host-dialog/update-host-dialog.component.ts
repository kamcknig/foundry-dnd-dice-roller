import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSetting } from '../../redux/settings.selectors';
import { SettingsState } from '../../redux/settings.state';

@Component({
  selector: 'app-update-host-dialog',
  templateUrl: './update-host-dialog.component.html',
  styleUrls: ['./update-host-dialog.component.scss'],
})
export class UpdateHostDialogComponent implements OnInit {
  public hostControl: FormControl;
  public host$: Observable<string>;

  constructor(
    private _modalController: ModalController,
    private _store: Store<SettingsState>
  ) { }

  ngOnInit() {
    this.hostControl = new FormControl();
    this.host$ = this._store.pipe(select(selectSetting('host')));
    this.host$.subscribe(value => this.hostControl.setValue(value));
  }

  updateHost(event?: KeyboardEvent): void {
    if (event && !(event.keyCode === 13)) {
      return;
    }

    this._modalController.dismiss(this.hostControl.value);
  }
}
