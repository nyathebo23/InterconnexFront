import { Component, Input, OnInit } from '@angular/core';
import { RequestReferral } from 'src/app/models/request-referral.model';

@Component({
  selector: 'app-referral-message',
  templateUrl: './referral-message.component.html',
  styleUrls: ['./referral-message.component.scss']
})
export class ReferralMessageComponent implements OnInit {

  @Input() referrals: RequestReferral[];
  constructor() { }

  ngOnInit(): void {
  }

}
