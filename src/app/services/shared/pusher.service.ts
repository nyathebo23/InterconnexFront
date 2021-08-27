import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;
  constructor() {

    this.channel = globalThis.pusher.subscribe('events-channel');
  }

}
