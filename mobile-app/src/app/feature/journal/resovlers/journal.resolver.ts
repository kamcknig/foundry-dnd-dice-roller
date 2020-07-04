import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { JournalEntry } from '../journal-entry.model';
import { SocketService } from '../../socket/socket.service';
import { MessageTypes } from 'src/app/message/message-types';

@Injectable({ providedIn: 'root' })
export class JournalResolver implements Resolve<JournalEntry[] | Partial<JournalEntry>[]> {
  constructor(
    private _socketService: SocketService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Partial<JournalEntry[] | Partial<JournalEntry>[]>> {
    const journalId = route.paramMap.get('journalId') ?? NaN;

    // TODO: check for journal ID in route param. Get specfic journal entry if so
    return from(this._socketService.emit<JournalEntry[] | Partial<JournalEntry>[]>(MessageTypes.REQUEST_JOURNAL_ENTRIES, true, journalId));
  }
}