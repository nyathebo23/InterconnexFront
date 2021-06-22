import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-ddia-list',
  templateUrl: './ddia-list.component.html',
  styleUrls: ['./ddia-list.component.scss']
})
export class DDIAListComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  constructor() {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  ngOnInit(): void {
  }

}
