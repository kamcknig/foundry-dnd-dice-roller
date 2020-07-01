import { Component } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AuthState } from '../redux/auth.state';
import { User } from 'src/app/foundry/foundry.models';
import { tokenEntered as tokenEntered } from '../redux/auth.actions';

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

  public handleSubmit(event: KeyboardEvent, token: string):void {
    if (event.keyCode !== 13) {
      return;
    }

    this.store.dispatch(tokenEntered({ token }));
  }

  public getItemStyle(user: User): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('--background: ' + user.color);
  }
}
