import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import { AuthState } from './feature/auth/redux/auth.state';
import { selectUser } from './feature/auth/redux/auth.selectors';
import { Observable } from 'rxjs';
import { User } from './feature/foundry/foundry.models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public user$: Observable<User>;

  constructor(
    private _platform: Platform,
    private _splashScreen: SplashScreen,
    private _statusBar: StatusBar,
    private _store: Store<AuthState>
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.user$ = this._store.select(selectUser);
  }

  initializeApp() {
    this._platform.ready().then(() => {
      this._statusBar.styleDefault();
      this._splashScreen.hide();
    });
  }
}
