import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { foundryStateKey } from './redux/foundry.state';
import { foundryReducer } from './redux/foundry.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(foundryStateKey, foundryReducer)
  ]
})
export class FoundryModule { }
