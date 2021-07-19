import { Unit } from 'src/app/models/unit.model';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-source-elts-list',
  templateUrl: './source-elts-list.component.html',
  styleUrls: ['./source-elts-list.component.scss', '../../../../assets/css/tables.scss']
})
export class SourceEltsListComponent {

  activeElt = 'units';
  constructor() {

  }

  setActive(element: string): void{
    this.activeElt = element;
  }
}
