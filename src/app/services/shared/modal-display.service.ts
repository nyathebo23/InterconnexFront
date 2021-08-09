import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDisplayService {

  constructor() { }

  getModalOptions(data: any, cssClass: string, ignoreBackdropClick?: boolean): any {
    return  {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: ignoreBackdropClick ? true : false,
      class: cssClass,
      containerClass: '',
      animated: true,
      data
    };
  }
}

