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

  public selectedUserName: string;
  public socketConnected$: Observable<boolean>;
  public userNames$: Observable<string[]>;
  public users$: Observable<any[]>;

  constructor(
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.socketConnected$ = merge(
      this.socket.fromEvent('connect'),
      this.socket.fromEvent('disconnect')
    ).pipe(
      // if we have a value it's because it's a disconnected because that comes with a reason
      map(value => {
        console.log(`${value ? 'disconnected' : 'connected'}`);
        return !value;
      })
    );

    // observable to obtain the up-to-date users list when the server sends it
    this.users$ = this.socket.fromEvent(MessageTypes.USER_LIST);

    // create a list of user names for the user to select
    this.userNames$ = this.users$.pipe(
      map((users: string[]) => {
        console.log(`Received user list`);
        return users.map((user: any) => user.name);
      }));
  }

  handleRoll(): void {
    this.socket.emit(MessageTypes.REQUEST_ROLL, response => {
      console.log(`Received roll response`);
      console.log(response);
    });
  }

  selectUserName(name: string): void {
    this.selectedUserName = name;
  }
}
