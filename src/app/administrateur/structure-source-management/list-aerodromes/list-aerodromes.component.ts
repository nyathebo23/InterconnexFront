
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MDBModalService } from 'angular-bootstrap-md';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalEditAerodromeComponent } from '../modal-edit-aerodrome/modal-edit-aerodrome.component';

@Component({
  selector: 'app-list-aerodromes',
  templateUrl: './list-aerodromes.component.html',
  styleUrls: ['./list-aerodromes.component.scss', '../../../../assets/css/tables.scss']
})
export class ListAerodromesComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  headAerodromeElements = ['STRUCTURESSOURCES.name',  'STRUCTURESSOURCES.locationInd', 'UpdateDelete.editBtn', 'UpdateDelete.deleteBtn'];
  aerodromes: Aerodrome[] = [];
  prevAerodromes: Aerodrome[] = [];
  loadingDatas = false;
  loaderId = 'list-aeros';
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  constructor(
    private cdAerodRef: ChangeDetectorRef,
    private adminService: AdminService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private ngxUiLoaderService: NgxUiLoaderService,
  ) {
    this.loadingDatas = true;
  }

  ngOnInit(): void{
    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.adminService.getAerodromesList().subscribe((aerodromesList) => {
      this.aerodromes = aerodromesList;
      this.mdbTable.setDataSource(this.aerodromes);
      this.aerodromes = this.mdbTable.getDataSource();
      this.prevAerodromes = this.mdbTable.getDataSource();
      this.loadingDatas = false;
      this.ngxUiLoaderService.stopLoader(this.loaderId);
    });
  }

  ngAfterViewInit(): void{
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdAerodRef.detectChanges();
  }

  editAerodrome(aerodrome: Aerodrome): void{
    this.modalService.show(ModalEditAerodromeComponent,
      this.modalDisplayService.getModalOptions({aerodrome}, 'modal-dialog modal-notify modal-warning')
    );
  }

  deleteAerodrome(aerodrome: Aerodrome): void{

  }

}

