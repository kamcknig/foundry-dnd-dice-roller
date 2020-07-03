import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './components/journal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JournalRoutingModule
  ],
  declarations: [JournalComponent]
})
export class JournalModule {}
