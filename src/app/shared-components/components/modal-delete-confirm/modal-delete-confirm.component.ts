import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';

@Component({
  selector: 'app-modal-delete-confirm',
  templateUrl: './modal-delete-confirm.component.html',
  styleUrls: ['./modal-delete-confirm.component.scss']
})
export class ModalDeleteConfirmComponent implements OnInit {

  id: string;
  deleteElementFunc: (id: string) => Promise<any>;
  contentText: string;
  loading = false;
  constructor(
    public modalRef: MDBModalRef,
    private adminService: AdminService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

  delete(): void {
    this.loading = true;
    this.deleteElementFunc(this.id)
    .then((resp) => {
      console.log(resp);
      this.adminService.reloadCurrentRoute();
    })
    .catch((err) => {
      this.modalService.show(ModalErrorComponent, this.modalDisplayService.getModalOptions(
        {contentText: this.adminService.displayErrors(err)[0]}, 'modal-dialog modal-notify modal-danger'));
      })
    .finally(() => {
      this.loading = false;
      this.modalRef.hide();
    });
  }

}
