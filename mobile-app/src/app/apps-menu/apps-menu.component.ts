import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../feature/auth/redux/auth.state';
import { ToastController } from '@ionic/angular';
import { SocketService } from '../feature/socket/socket.service';
import { selectUser } from '../feature/auth/redux/auth.selectors';
import { UserRoles, User } from '../feature/foundry/foundry.models';

@Component({
  selector: 'app-apps-menu',
  templateUrl: './apps-menu.component.html',
  styleUrls: ['./apps-menu.component.scss'],
})
export class AppsMenuComponent implements OnInit {
  public user$: Observable<User>;
  public userRoles = UserRoles;

  constructor(
    private _store: Store<AuthState>,
    private _toastController: ToastController,
    public socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.user$ = this._store.pipe<User>(select(selectUser));
  }

  async handleRoll(): Promise<void> {
    // const rollResult = await this.socketService.emit(MessageTypes.REQUEST_ROLL, true);
    // const toast = await this._toastController.create({
    //   animated: true,
    //   duration: 2000,
    //   header: 'Roll Result!',
    //   message: rollResult.result.total
    // });

    // toast.present();
  }
}
