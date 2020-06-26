import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-choose-user',
  templateUrl: 'choose-user.component.html',
  styleUrls: ['choose-user.component.scss'],
})
export class ChooseUserComponent implements OnInit {

  public users$: Observable<any[]>;

  constructor(
    public socketService: SocketService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.users$ = this.socketService.users$.pipe(tap(users => users.forEach(u => console.log(u))));
  }

  public selectUser(user: any): void {

  }

  public getItemStyle(user): any {
    return this.sanitizer.bypassSecurityTrustStyle('--background: ' + user.color);
  }
}
