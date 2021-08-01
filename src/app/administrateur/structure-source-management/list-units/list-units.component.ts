import { Unit } from 'src/app/models/unit.model';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { AdminService } from 'src/app/services/agent-services/admin.service';

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.scss', '../../../../assets/css/tables.scss']
})
export class ListUnitsComponent implements OnInit, AfterViewInit {

  pref = 'SOURCEUNIT.';
  headUnitsElements = ['name', 'email', 'adress', 'fax', 'phone', 'rsfta', 'structuresource'];
  units: Unit[] = [];
  prevUnits: Unit[] = [];
  loadingDatas: boolean;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  constructor(private cdUnitsRef: ChangeDetectorRef, private adminService: AdminService) {
    this.loadingDatas = true;
    this.headUnitsElements = this.headUnitsElements.map((elt) => this.pref + elt);
    this.headUnitsElements.push('UpdateDelete.editBtn');
    this.headUnitsElements.push('UpdateDelete.deleteBtn');

  }
  ngOnInit(): void{
    this.adminService.getUnitsList().subscribe((units: Unit[]) => {
      this.units = units;
      this.mdbTable.setDataSource(this.units);
      this.units = this.mdbTable.getDataSource();
      this.prevUnits = this.mdbTable.getDataSource();
      this.loadingDatas = false;
    });
  }

  ngAfterViewInit(): void{
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdUnitsRef.detectChanges();
  }

  editUnit(unit: Unit): void{

  }
  deleteUnit(unit: Unit): void{

  }

}

