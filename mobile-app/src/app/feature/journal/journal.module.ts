import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './components/journal.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { journalStateKey } from './redux/journal.state';
import { journalReducer } from './redux/journal.reducers';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(journalStateKey, journalReducer),
    JournalRoutingModule
  ],
  declarations: [JournalComponent]
})
export class JournalModule {}
