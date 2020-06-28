import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { userSelected } from '../redux/auth.actions';
import { AuthState } from '../redux/auth.state';
import { User } from 'src/app/foundry/foundry.models';

@Component({
  selector: 'app-choose-user',
  templateUrl: 'choose-user.component.html',
  styleUrls: ['choose-user.component.scss'],
})
export class ChooseUserComponent {

  constructor(
    public socketService: SocketService,
    public sanitizer: DomSanitizer,
    private store: Store<AuthState>
  ) {}

  public selectUser(user: User): void {
    this.store.dispatch(userSelected(user));
  }

  public getItemStyle(user: User): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('--background: ' + user.color);
  }
}
