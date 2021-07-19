import { DemandeAICItemListI } from '../interfaces/demande-aic-itemlist.interface';

export class DemandeAICItemList{
    // tslint:disable-next-line:variable-name
    private _unitName: string;
    // tslint:disable-next-line:variable-name
    private _airportName: string;
    // tslint:disable-next-line:variable-name
    private _identDDIA: string;
    // tslint:disable-next-line:variable-name
    private _depositDatetime: Date;
    // tslint:disable-next-line:variable-name
    private _state: string;
    // tslint:disable-next-line:variable-name
    private _subject: string;
    // tslint:disable-next-line:variable-name
    private _object: string;
    // tslint:disable-next-line:variable-name
    private _text: string;


    constructor(
        unitName: string,
        aiportName: string,
        identDDIA: string,
        depositDatetime: Date,
        state: string,
        subject: string,
        object: string,
        text: string
    ){
        this._unitName = unitName;
        this._airportName = aiportName;
        this._identDDIA = identDDIA;
        this._depositDatetime = depositDatetime;
        this._state = state;
        this._subject = subject;
        this._object = object;
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
    public get subject(): string{
        return this._subject;
    }
    public get object(): string{
        return this._object;
    }
    public get text(): string{
        return this._text;
    }

    public static fromJSON(data: any): DemandeAICItemList{
        return new DemandeAICItemList(
            data.unit_name,
            data.airport_name,
            data.ident_ddia,
            new Date(data.deposit_datetime),
            data.state,
            data.subject,
            data.object,
            data.descriptive_text
        );
    }
}
