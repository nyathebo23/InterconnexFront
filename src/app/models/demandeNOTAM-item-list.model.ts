import { DemandeNOTAMItemListI } from '../interfaces/demande-notam-itemlist.interface';

export class DemandeNOTAMItemList {
    // tslint:disable-next-line:variable-name
    private _unitName: string;
    // tslint:disable-next-line:variable-name
    private _airportName: string;
    // tslint:disable-next-line:variable-name
    private _identDDIA: string;
    // tslint:disable-next-line:variable-name
    private _typeNOTAM: string;
    // tslint:disable-next-line:variable-name
    private _depositDatetime: Date;
    // tslint:disable-next-line:variable-name
    private _periodType: string;
    // tslint:disable-next-line:variable-name
    private _startValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _endValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _state: string;
    // tslint:disable-next-line:variable-name
    private _text: string;

    constructor(
        unitName: string,
        aiportName: string,
        identDDIA: string,
        typeNOTAM: string,
        depositDatetime: Date,
        state: string,
        periodType: string,
        startValPeriod: Date,
        endValPeriod: Date,
        text: string
    ){
        this._unitName = unitName;
        this._airportName = aiportName;
        this._identDDIA = identDDIA;
        this._depositDatetime = depositDatetime;
        this._state = state;
        this._typeNOTAM = typeNOTAM;
        this._periodType = periodType;
        this._startValidityPeriod = startValPeriod;
        this._endValidityPeriod = endValPeriod;
        this._text = text;
    }

    public get unitName(): string{
        return this._unitName;
    }
    public get airportName(): string{
        return this._airportName;
    }
    public get identDDIA(): string{
        return this._identDDIA;
    }
    public get depositDatetime(): Date{
        return this._depositDatetime;
    }
    public get state(): string{
        return this._state;
    }
    public set state(value: string) {
        this._state = value;
    }
    public get startValidityPeriod(): Date{
        return this._startValidityPeriod;
    }
    public get endValidityPeriod(): Date{
        return this._endValidityPeriod;
    }
    public get text(): string{
        return this._text;
    }
    public get periodType(): string{
        return this._periodType;

    }
    public get typeNOTAM(): string {
        return this._typeNOTAM;
    }

    public static fromJSON(data: any): DemandeNOTAMItemList{
        return new DemandeNOTAMItemList(
            data.unit_name,
            data.airport_name,
            data.ident_ddia,
            data.type_notam,
            new Date(data.deposit_datetime),
            data.state,
            data.validity_period_type,
            new Date(data.start_val_period),
            new Date(data.end_val_period),
            data.descriptive_text
        );
    }
}
