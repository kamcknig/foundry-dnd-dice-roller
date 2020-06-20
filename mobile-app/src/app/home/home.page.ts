import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient) {}

  public testFetch(): void {
    this.http.get('https://foundry-api.turkeysunite.com').subscribe({
      next: (value) => {
        console.log(value);
      }
    });
  }
}
