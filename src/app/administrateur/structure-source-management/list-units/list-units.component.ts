import { Unit } from 'src/app/models/unit.model';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.scss', '../../../../assets/css/tables.scss']
})
export class ListUnitsComponent implements OnInit, AfterViewInit {

  pref = 'SOURCEUNIT.';
  headUnitsElements = ['name', 'email', 'adress', 'fax', 'phone', 'rsfta', 'structuresource'];
  units: Unit[];
  prevUnits: Unit[];

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  constructor(private cdUnitsRef: ChangeDetectorRef) {
    this.headUnitsElements = this.headUnitsElements.map((elt) => this.pref + elt);
    this.headUnitsElements.push('UpdateDelete.editBtn');
    this.headUnitsElements.push('UpdateDelete.deleteBtn');
  }

  ngOnInit(): void{
    this.units = [
      new Unit('0', 'franckhebo@gmail.com', 'Unité MIRE', '+ 237 225 282 565', '2350545415', 'djkdjzdzjke', '1', 'Aeroport de Douala'),
      new Unit('1', 'talompatrick@gmail.com', 'Unité METAR', '+ 237 225 282 565', '2350545415', 'djkdjzdzjke', '1', 'Aeroport de Douala'),
      new Unit('2', 'abbarapaya@ccaa.caero', 'Unité MIS', '+ 237 225 282 565', '6 635 054 545', 'AEETDTGHFG', '1', 'Aeroport de Douala'),
    ];

    this.mdbTable.setDataSource(this.units);
    this.units = this.mdbTable.getDataSource();
    this.prevUnits = this.mdbTable.getDataSource();

  }

  ngAfterViewInit(): void{
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(2);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdUnitsRef.detectChanges();
  }

  editUnit(unit: Unit): void{

  }
  deleteUnit(unit: Unit): void{

  }

}

