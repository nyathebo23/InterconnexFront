import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-prec-page',
  templateUrl: './back-to-prec-page.component.html',
  styleUrls: ['./back-to-prec-page.component.scss']
})
export class BackToPrecPageComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

}
