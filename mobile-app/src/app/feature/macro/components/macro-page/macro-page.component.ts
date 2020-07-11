import { Component, OnInit, Input } from '@angular/core';
import { Foundry } from 'src/app/feature/foundry/foundry.models';
import { Store, select } from '@ngrx/store';
import { MacroState } from '../../redux/macro.state';
import { selectMacros } from '../../redux/macro.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-macro-page',
  templateUrl: './macro-page.component.html',
  styleUrls: ['./macro-page.component.scss'],
})
export class MacrosPageComponent implements OnInit {
  public macros$: Observable<Foundry.Macro[]>;

  constructor(
    private _macroStore$: Store<MacroState>
  ) { }

  ngOnInit() {
    this.macros$ = this._macroStore$.pipe(select(selectMacros));
  }
}
