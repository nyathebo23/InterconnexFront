import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Pusher from 'pusher-js/src/core/pusher';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;
  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
    });
    this.channel = this.pusher.subscribe('events-channel');
  }

}
