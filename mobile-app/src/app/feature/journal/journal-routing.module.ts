import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JournalComponent } from './components/journal.component';
import { JournalResolver } from './resovlers/journal.resolver';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent,
    resolve: {
      journal: JournalResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalRoutingModule {}
