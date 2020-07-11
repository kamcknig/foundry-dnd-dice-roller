import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, of, throwError } from 'rxjs';
import { map, takeUntil, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { selectUser } from '../../auth/redux/auth.selectors';
import { AuthState } from '../../auth/redux/auth.state';
import { UserRoles, JournalEntry, EntityPermissions } from '../../foundry/foundry.models';
import { selectJournalEntries } from '../redux/journal.selectors';
import { JournalState } from '../redux/journal.state';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent implements OnInit, AfterViewInit, OnDestroy {
  private _entries: ElementRef<HTMLDivElement>[];

  @ViewChildren('entry') set entry(value: QueryList<ElementRef<HTMLDivElement>>) {
    this._entries = Array.from(value);
  }

  private _destroy$: Subject<void> = new Subject<void>();

  public journalEntries$: Observable<JournalEntry[] | Partial<JournalEntry>[]>;

  constructor(
    private _journalStore$: Store<JournalState>,
    private _authStore$: Store<AuthState>
  ) { }

  ngOnInit(): void {
    this.journalEntries$ = this._journalStore$.pipe(select(selectJournalEntries));
  }

  ngAfterViewInit(): void {
    this._authStore$.pipe(
      select(selectUser),
      withLatestFrom(this.journalEntries$),
      takeUntil(this._destroy$),
      catchError(err => {
        console.log(`There was an issue modifying journal secrets. '${err}'`);
        return throwError(err);
      })
    ).subscribe(([u, entries]) => {
      const permOverride: boolean = u.role === UserRoles.GAMEMASTER || u.role === UserRoles.ASSISTANT;
      let secretPerm: boolean;

      // loop through and see if the player has permission on the journal to view secrets and if not
      // give the journal a hidden css class so we can set its visibility
      entries.forEach((e, index) => {
        secretPerm = e.permission[u._id] !== undefined ? e.permission[u._id] === EntityPermissions.OWNER : e.permission.default === EntityPermissions.OWNER
        secretPerm = secretPerm || permOverride;
        const secrets = this._entries[index].nativeElement.getElementsByClassName('secret');
        const secretsArr = Array.from(secrets);
        secretsArr.forEach(s => {
          if (secretPerm) {
            s.classList.remove('hidden');
          }
          else {
            s.classList.add('hidden');
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
