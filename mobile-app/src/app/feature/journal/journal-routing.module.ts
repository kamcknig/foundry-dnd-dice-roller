import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalResolver } from './resovlers/journal.resolver';
import { JournalPageComponent } from './components/journal-page.component';

const routes: Routes = [
  {
    path: '',
    component: JournalPageComponent,
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
