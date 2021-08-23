import { Injectable } from '@angular/core';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { NationalInformer } from 'src/app/models/national-informer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorityLocalinformerService {

  localinformer: LocalInformer;
  nationalInf: NationalInformer;
  aerodromesList: Aerodrome[];

  constructor() { }

  getLocalInf(): LocalInformer {
    if (this.localinformer){
      return this.localinformer;
    }
    const jsonData = JSON.parse(localStorage.getItem('agentExtras'));
    if (jsonData && jsonData.localinformer){
      return LocalInformer.fromJSON(jsonData.localinformer);
    }
    return null;
  }

}
