import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageTypes } from '../message/message-types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public socketConnected$: Observable<boolean>;

  constructor(
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.socketConnected$ = merge(
      this.socket.fromEvent('connect'),
      this.socket.fromEvent('disconnect')
    ).pipe(
      // if we have a value it's because it's a disconnected because that comes with a reason
      map(value => !value)
    );
  }

  handleRoll(): void {
    this.socket.emit(MessageTypes.REQUEST_ROLL, response => {
      console.log(`Received roll response`);
      console.log(response);
    });
  }
}
