import { Component, Input, OnInit } from '@angular/core';
import { DDIAHistory } from 'src/app/models/ddia-history.model';

@Component({
  selector: 'app-history-box',
  templateUrl: './history-box.component.html',
  styleUrls: ['./history-box.component.scss']
})
export class HistoryBoxComponent implements OnInit {

  @Input() history: DDIAHistory[];
  constructor() { }

  ngOnInit(): void {
  }

}
