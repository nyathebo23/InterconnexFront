import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms-view',
  templateUrl: './forms-view.component.html',
  styleUrls: ['./forms-view.component.scss']
})
export class FormsViewComponent implements OnInit {

  activeDDIA = 'notam';
  constructor() { }

  ngOnInit(): void {
  }

  setActiveDDIA(ddia: string): void{
    this.activeDDIA = ddia;
  }
}
