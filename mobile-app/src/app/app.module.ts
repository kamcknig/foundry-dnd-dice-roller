import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppsMenuComponent } from './apps-menu/apps-menu.component';
import { AuthModule } from './feature/auth/auth.module';
import { CombatModule } from './feature/combat/combat.module';
import { FoundryModule } from './feature/foundry/foundry.module';
import { HomeModule } from './feature/home/home.module';
import { SettingsModule } from './feature/settings/settings.module';
import { SharedModule } from './feature/shared/shared.module';
import { MacroModule } from './feature/macro/macro.module';

// https://foundry-api2.turkeysunite.com

@NgModule({
  declarations: [
    AppComponent,
    AppsMenuComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    CombatModule,
    AuthModule,
    HomeModule,
    SettingsModule,
    SocketIoModule.forRoot({
      url: 'http://localhost:8082/mobile'
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FoundryModule,
    MacroModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [
    AppsMenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {
    // router.events.subscribe(value => console.log(value));
  }
}
