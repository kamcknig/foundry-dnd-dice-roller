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
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'text/html'
    });

    this.http.get('https://foundry-api.turkeysunite.com', { headers, responseType: 'text' }).subscribe({
      next: (value) => {
        console.log(value);
      }
    });
  }
}
