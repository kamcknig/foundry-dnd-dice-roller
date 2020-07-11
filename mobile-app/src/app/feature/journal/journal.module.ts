import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { journalStateKey } from './redux/journal.state';
import { journalReducer } from './redux/journal.reducers';
import { JournalPageComponent } from './components/journal-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(journalStateKey, journalReducer),
    JournalRoutingModule
  ],
  declarations: [JournalPageComponent]
})
export class JournalModule {}
