import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { SocketIoModule } from 'ngx-socket-io';
import { StoreModule } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './feature/auth/auth.module';
import { SharedModule } from './feature/shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HomeModule } from './feature/home/home.module';
import { AppsMenuComponent } from './apps-menu/apps-menu.component';
import { CommonModule } from '@angular/common';

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
    SocketIoModule.forRoot({
      url: 'http://localhost:8082/mobile'
    }),
    IonicModule.forRoot(),
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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
    router.events.subscribe(value => console.log(value));
  }
}
