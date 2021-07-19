import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ddia-list',
  templateUrl: './ddia-list.component.html',
  styleUrls: ['./ddia-list.component.scss']
})
export class DDIAListComponent implements OnInit {


  @Input() labelTitle: string;
  constructor() {
  }

  ngOnInit(): void {
  }

}
