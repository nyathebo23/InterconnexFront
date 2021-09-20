import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';

@Injectable({
  providedIn: 'root'
})
export class ActionsOnDDIAListService {

  ddiaActionsListSubject = new Subject<ActionOnDDIA[]>();
  pagesNbSubject = new Subject<number>();
  pagesListSubject = new Subject<number[]>();
  currentPageSubject = new Subject<number>();
  constructor() { }
}
