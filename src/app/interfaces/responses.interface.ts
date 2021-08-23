import { ActionOnDDIA } from '../models/action-on-ddia.model';
import { ActionOnDDIAI } from './action-on-ddia.interface';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeAICItemListI } from './demande-aic-itemlist.interface';
import { DemandeNOTAMItemListI } from './demande-notam-itemlist.interface';
import { DemandeSUPPItemListI } from './demande-suppaip-itemlist.interface';


export interface PaginateActionOnDDIAResp{
    results: ActionOnDDIAI[];
    counts: number;
}

export interface ActionsOnDDIAList{
    actionsAgent: ActionOnDDIA[];
    counts: number;
}

export interface PaginateDDIAListResp {
    results: (DemandeNOTAMItemListI | DemandeAICItemListI | DemandeSUPPItemListI)[];
    counts: number;
}

export interface ListDDIA {
    listDDIA: (DemandeNOTAMItemList | DemandeSUPPItemList | DemandeAICItemList)[];
    counts: number;
}
