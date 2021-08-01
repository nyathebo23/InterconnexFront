import { DemandeAICItemListI } from '../interfaces/demande-aic-itemlist.interface';
import { DemandeNOTAMItemListI } from '../interfaces/demande-notam-itemlist.interface';
import { DemandeSUPPItemListI } from '../interfaces/demande-suppaip-itemlist.interface';
import { DDIABaseItemList } from './ddia-base-item-list.model';

export class DemandeSUPPItemList extends DDIABaseItemList {

    // tslint:disable-next-line:variable-name
    private _typeSUPPAIP: string;
    // tslint:disable-next-line:variable-name
    private _startValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _endValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _object: string;


    constructor(
        id: string,
        ddiaType: string,
        unitName: string,
        aiportName: string,
        identDDIA: string,
        typeSUPP: string,
        depositDatetime: Date,
        state: string,
        object: string,
        startValPeriod: Date,
        endValPeriod: Date,
        text: string,
        url: string
    ){
        super(id, ddiaType, unitName, aiportName, identDDIA, depositDatetime, state, text, url);
        this._typeSUPPAIP = typeSUPP;
        this._object = object;
        this._startValidityPeriod = startValPeriod;
        this._endValidityPeriod = endValPeriod;
    }

    public get typeSUPPAIP(): string {
        return this._typeSUPPAIP;
    }
    public get startValidityPeriod(): Date{
        return this._startValidityPeriod;
    }
    public get endValidityPeriod(): Date{
        return this._endValidityPeriod;
    }
    public get object(): string{
        return this._object;
    }

    public static fromJSON(data: any): DemandeSUPPItemList{
        return new DemandeSUPPItemList(
            data.id,
            data.type_ddia,
            data.unit_name,
            data.airport_name,
            data.ident_ddia,
            data.type_suppaip,
            new Date(data.deposit_datetime),
            data.state,
            data.object,
            new Date(data.start_val_period),
            new Date(data.end_val_period),
            data.descriptive_text,
            data.url
        );
    }

}
