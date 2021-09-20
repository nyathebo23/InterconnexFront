import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AdminService } from 'src/app/services/agent-services/admin.service';

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
      alert('failed');
    })
    .finally(() => {
      this.loading = false;
      this.modalRef.hide();
    });
  }

}
