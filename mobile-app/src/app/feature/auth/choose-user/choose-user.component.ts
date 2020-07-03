import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../redux/auth.state';
import { tokenEntered as tokenEntered } from '../redux/auth.actions';
import { selectFoundryUsers } from '../redux/foundry.selectors';
import { Observable } from 'rxjs';
import { User } from '../../foundry/foundry.models';

@Component({
  selector: 'app-choose-user',
  templateUrl: 'choose-user.component.html',
  styleUrls: ['choose-user.component.scss'],
})
export class ChooseUserComponent implements OnInit {
  public userList$: Observable<User[]>;

  constructor(
    public socketService: SocketService,
    public sanitizer: DomSanitizer,
    private _store: Store<AuthState>
  ) {}

  public ngOnInit(): void {
    this.userList$ = this._store.pipe<User[]>(select(selectFoundryUsers));
  }

  public handleSubmit(event: KeyboardEvent, token: string): void {
    if (event.keyCode !== 13) {
      return;
    }

    this._store.dispatch(tokenEntered({ token }));
  }
}
