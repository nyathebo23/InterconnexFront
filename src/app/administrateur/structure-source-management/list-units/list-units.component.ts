import { Unit } from 'src/app/models/unit.model';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalService } from 'angular-bootstrap-md';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalEditUnitComponent } from '../modal-edit-unit/modal-edit-unit.component';
import { ModalDeleteConfirmComponent } from 'src/app/shared-components/components/modal-delete-confirm/modal-delete-confirm.component';

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
  loaderId = 'list-units';
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  constructor(
    private cdUnitsRef: ChangeDetectorRef,
    private adminService: AdminService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {
    this.loadingDatas = true;
    this.headUnitsElements = this.headUnitsElements.map((elt) => this.pref + elt);
    this.headUnitsElements.push('UpdateDelete.editBtn');
    this.headUnitsElements.push('UpdateDelete.deleteBtn');

  }
  ngOnInit(): void{
    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.adminService.getUnitsList().subscribe((units: Unit[]) => {
      this.units = units;
      this.mdbTable.setDataSource(this.units);
      this.units = this.mdbTable.getDataSource();
      this.prevUnits = this.mdbTable.getDataSource();
      this.loadingDatas = false;
    }, error => {
      this.adminService.setError(error);
    }, () => {
      this.ngxUiLoaderService.stopLoader(this.loaderId);
    });
  }

  ngAfterViewInit(): void{
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdUnitsRef.detectChanges();
  }

  editUnit(unit: Unit): void{
    this.modalService.show(ModalEditUnitComponent,
      this.modalDisplayService.getModalOptions({unit}, 'modal-dialog modal-notify modal-warning')
    );
  }

  deleteUnit(id: string): void{
    this.modalService.show(ModalDeleteConfirmComponent,
      this.modalDisplayService.getModalOptions({
        id,
        deleteElementFunc: this.adminService.deleteUnit}, 'modal-dialog modal-notify modal-danger'));
  }

}

