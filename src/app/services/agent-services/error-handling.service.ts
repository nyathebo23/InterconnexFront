import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  errorsSubject: Subject<string> = new Subject<string>();
  constructor() { }

}
