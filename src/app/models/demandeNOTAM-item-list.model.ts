import { DemandeNOTAMItemListI } from '../interfaces/demande-notam-itemlist.interface';
import { DDIABaseItemList } from './ddia-base-item-list.model';

export class DemandeNOTAMItemList extends DDIABaseItemList {

    // tslint:disable-next-line:variable-name
    private _typeNOTAM: string;
    // tslint:disable-next-line:variable-name
    private _periodType: string;
    // tslint:disable-next-line:variable-name
    private _startValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _endValidityPeriod: Date;


    constructor(
        id: string,
        ddiaType: string,
        unitName: string,
        aiportName: string,
        identDDIA: string,
        typeNOTAM: string,
        depositDatetime: Date,
        state: string,
        periodType: string,
        startValPeriod: Date,
        endValPeriod: Date,
        text: string,
        url: string
    ){
        super(id, ddiaType, unitName, aiportName, identDDIA, depositDatetime, state, text, url);

        this._typeNOTAM = typeNOTAM;
        this._periodType = periodType;
        this._startValidityPeriod = startValPeriod;
        this._endValidityPeriod = endValPeriod;
    }

    public get startValidityPeriod(): Date{
        return this._startValidityPeriod;
    }
    public get endValidityPeriod(): Date{
        return this._endValidityPeriod;
    }
    public get periodType(): string{
        return this._periodType;
    }
    public get typeNOTAM(): string {
        return this._typeNOTAM;
    }

    public static fromJSON(data: any): DemandeNOTAMItemList{
        return new DemandeNOTAMItemList(
            data.id,
            data.type_ddia,
            data.unit_name,
            data.airport_name,
            data.ident_ddia,
            data.type_notam,
            new Date(data.deposit_datetime),
            data.state,
            data.validity_period_type,
            new Date(data.start_val_period),
            new Date(data.end_val_period),
            data.descriptive_text,
            data.url
        );
    }
}
