import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JournalEntry } from '../journal-entry.model';

@Injectable({ providedIn: 'root' })
export class JournalResolver implements Resolve<JournalEntry | Partial<JournalEntry>[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<JournalEntry | JournalEntry[]> {
    throw new Error("Method not implemented.");
  }
}