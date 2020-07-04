import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JournalEntry } from '../journal-entry.model';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent implements OnInit {
  public journalEntries$: Observable<JournalEntry[] | Partial<JournalEntry>[]>;

  panelOpenState: boolean;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.journalEntries$ = this._route.data.pipe<JournalEntry[] | Partial<JournalEntry>[]>(map(d => d.journal));
    this.journalEntries$.subscribe(value => console.log(value));
  }
}
