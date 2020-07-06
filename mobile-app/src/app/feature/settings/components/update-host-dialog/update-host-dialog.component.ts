import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '../../redux/settings.state';
import { selectSetting } from '../../redux/settings.selectors';

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

  onClick(): void {
    this._modalController.dismiss(this.hostControl.value);
  }
}
