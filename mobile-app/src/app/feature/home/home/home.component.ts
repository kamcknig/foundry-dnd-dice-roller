import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MessageTypes } from 'src/app/message/message-types';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    public socketService: SocketService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void { }

  handleRoll(): void {
    this.socketService.emit(MessageTypes.REQUEST_ROLL, async response => {
      console.log(`Received roll response`);
      console.log(response);
      const toast = await this.toastController.create({
        animated: true,
        duration: 2000,
        header: 'Roll Result!',
        message: response.result.total
      });

      toast.present();
    });
  }
}
