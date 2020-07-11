import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageTypes } from 'src/app/message/message-types';
import { AppState } from 'src/app/redux/app.reducers';
import { SocketService } from '../../socket/socket.service';
import { journalEntriesReceived } from '../redux/journal.actions';
import { JournalEntry } from '../../foundry/foundry.models';

@Injectable({ providedIn: 'root' })
export class JournalResolver implements Resolve<JournalEntry[] | Partial<JournalEntry>[]> {
  constructor(
    private _socketService: SocketService,
    private _store$: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Partial<JournalEntry>[] | Observable<Partial<JournalEntry[] | Partial<JournalEntry>[]>> {
    const journalId = route.paramMap.get('journalId') ?? NaN;

    // When requesting journals, we're only going to get back any that the user on foundry actually has permissions for

    // TODO: check for journal ID in route param. Get specfic journal entry if so
    return from(this._socketService.emit<JournalEntry[] | Partial<JournalEntry>[]>(MessageTypes.REQUEST_JOURNAL_ENTRIES, true, journalId)).pipe(
      tap(entries => {
        this._store$.dispatch(journalEntriesReceived({ entries }));
      })
    );
  }
}