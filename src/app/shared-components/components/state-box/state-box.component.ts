import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-box',
  templateUrl: './state-box.component.html',
  styleUrls: ['./state-box.component.scss']
})
export class StateBoxComponent implements OnInit {

  @Input() state: string;
  @Input() active: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
