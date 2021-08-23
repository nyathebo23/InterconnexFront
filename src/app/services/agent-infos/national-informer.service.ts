import { Injectable } from '@angular/core';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { NationalInformer } from 'src/app/models/national-informer.model';

@Injectable({
  providedIn: 'root'
})
export class NationalInformerService {

  nationalinformer: NationalInformer;
  localInformer: LocalInformer;
  aerodromesList: Aerodrome[];

  constructor() { }

  getNationalInf(): NationalInformer {
    if (this.nationalinformer){
      return this.nationalinformer;
    }
    const jsonData = localStorage.getItem('nationalInformer');
    if (jsonData){
      return NationalInformer.fromJSON(JSON.parse(jsonData));
    }
    return null;
  }

}
