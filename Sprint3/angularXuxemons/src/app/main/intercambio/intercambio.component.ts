import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-intercambio',
  templateUrl: './intercambio.component.html',
  styleUrls: ['./intercambio.component.css'],
})
export class IntercambioComponent implements OnInit {
  username: string = 'username';
  message: string = '';
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('070f21dbf126b2a0113c', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => this.messages.push(data));
  }

  submit(): void {
    // event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    this.http.post<any>('http://localhost:8000/api/messages', {
        userName: this.username,
        message: this.message,
    }).subscribe(() => {
        this.message = '';
    });
}

}
