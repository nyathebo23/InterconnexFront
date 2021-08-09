import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-data-error',
  templateUrl: './load-data-error.component.html',
  styleUrls: ['./load-data-error.component.scss']
})
export class LoadDataErrorComponent implements OnInit {

  @Input() isConnexionErr: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
