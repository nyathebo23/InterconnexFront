import { DemandeAICItemListI } from './demande-aic-itemlist.interface';
import { DemandeNOTAMItemListI } from './demande-notam-itemlist.interface';
import { DemandeSUPPItemListI } from './demande-suppaip-itemlist.interface';
import { NationalInformerI } from './national-informer.interface';

export interface ActionOnDDIAI{
    ddia_object: DemandeAICItemListI | DemandeNOTAMItemListI | DemandeSUPPItemListI;
    prev_state: string;
    date_time: string;
    new_state: string;
    target_nationalinf?: NationalInformerI;
}
