
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { AdminService } from 'src/app/services/agent-services/admin.service';

@Component({
  selector: 'app-list-aerodromes',
  templateUrl: './list-aerodromes.component.html',
  styleUrls: ['./list-aerodromes.component.scss', '../../../../assets/css/tables.scss']
})
export class ListAerodromesComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  headAerodromeElements = ['STRUCTURESSOURCES.name',  'STRUCTURESSOURCES.locationInd', 'UpdateDelete.editBtn', 'UpdateDelete.deleteBtn'];
  aerodromes: Aerodrome[];
  prevAerodromes: Aerodrome[];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  constructor(private cdAerodRef: ChangeDetectorRef, private adminService: AdminService) {
    this.adminService.getAerodromesList().subscribe((aerodromesList) => {
      this.aerodromes = aerodromesList;
    });
  }

  ngOnInit(): void{
    this.mdbTable.setDataSource(this.aerodromes);
    this.aerodromes = this.mdbTable.getDataSource();
    this.prevAerodromes = this.mdbTable.getDataSource();
  }

  ngAfterViewInit(): void{
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(2);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdAerodRef.detectChanges();
  }

  editAerodrome(aerodrome: Aerodrome): void{

  }

  deleteAerodrome(aerodrome: Aerodrome): void{

  }

}

