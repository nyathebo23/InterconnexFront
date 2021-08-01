import { DemandeAICItemListI } from '../interfaces/demande-aic-itemlist.interface';
import { DemandeNOTAMItemListI } from '../interfaces/demande-notam-itemlist.interface';
import { DemandeSUPPAIPI } from '../interfaces/demande-supp.interface';
import { DemandeAICItemList } from './demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from './demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from './demandeSUPP-item-list.model';

export class DDIAItemList {
    public static fromJSON(data: any): DemandeSUPPItemList | DemandeNOTAMItemList | DemandeAICItemList {
       if (DDIAItemList.isNOTAM(data)){
        return DemandeNOTAMItemList.fromJSON(data);
       }
       else if (DDIAItemList.isAIC(data)){
        return DemandeAICItemList.fromJSON(data);
       }
       else if (DDIAItemList.isSUPPAIP(data)){
        return DemandeSUPPItemList.fromJSON(data);
       }

    }

    public static isNOTAM(ddia): boolean{
        return ddia.type_ddia === 'NOTAM';
    }
    public static isSUPPAIP(ddia): boolean{
        return ddia.type_ddia === 'SUPP AIP';
    }
    public static isAIC(ddia): boolean{
        return ddia.type_ddia === 'AIC';
    }

}
