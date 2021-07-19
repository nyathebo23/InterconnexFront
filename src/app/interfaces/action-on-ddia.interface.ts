import { DemandeAICItemListI } from './demande-aic-itemlist.interface';
import { DemandeNOTAMItemListI } from './demande-notam-itemlist.interface';
import { DemandeSUPPItemListI } from './demande-suppaip-itemlist.interface';

export interface ActionOnDDIAI{
    ddia_object: DemandeAICItemListI | DemandeNOTAMItemListI | DemandeSUPPItemListI;
    prev_state: string;
    date_time: string;
    new_state: string;
}
