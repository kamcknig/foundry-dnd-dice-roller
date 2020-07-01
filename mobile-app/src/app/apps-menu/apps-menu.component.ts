import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, USER_ROLES } from '../foundry/foundry.models';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../feature/auth/redux/auth.state';
import { ToastController } from '@ionic/angular';
import { SocketService } from '../feature/socket/socket.service';
import { selectUser } from '../feature/auth/redux/auth.selectors';
import { MessageTypes } from '../message/message-types';


@Component({
  selector: 'app-apps-menu',
  templateUrl: './apps-menu.component.html',
  styleUrls: ['./apps-menu.component.scss'],
})
export class AppsMenuComponent implements OnInit {
  public user$: Observable<User>;
  public userRoles = USER_ROLES;

  constructor(
    private _store: Store<AuthState>,
    private _toastController: ToastController,
    public socketService: SocketService,
  ) { }

  ngOnInit() {
    this.user$ = this._store.pipe(select(selectUser));
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
