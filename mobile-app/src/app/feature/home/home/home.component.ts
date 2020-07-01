import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/redux/auth.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public store: Store<AuthState>,
    public socketService: SocketService
  ) {}

  ngOnInit(): void {

  }
}
