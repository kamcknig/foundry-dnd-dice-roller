import { Component, OnInit, Input } from '@angular/core';
import { Macro } from 'src/app/feature/foundry/foundry.models';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-macro-dialog',
  templateUrl: './macro-dialog.component.html',
  styleUrls: ['./macro-dialog.component.scss'],
})
export class MacroDialogComponent implements OnInit {

  @Input() macros: Macro[];

  constructor(
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.macros);
  }

  handleClose(): void {
    this._modalController.dismiss();
  }
}
