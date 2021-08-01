import { DemandeAICItemListI } from '../interfaces/demande-aic-itemlist.interface';
import { DDIABaseItemList } from './ddia-base-item-list.model';

export class DemandeAICItemList extends DDIABaseItemList{

    // tslint:disable-next-line:variable-name
    private _subject: string;
    // tslint:disable-next-line:variable-name
    private _object: string;


    constructor(
        id: string,
        ddiaType: string,
        unitName: string,
        aiportName: string,
        identDDIA: string,
        depositDatetime: Date,
        state: string,
        subject: string,
        object: string,
        text: string,
        url: string
    ){
        super(id, ddiaType, unitName, aiportName, identDDIA, depositDatetime, state, text, url);
        this._subject = subject;
        this._object = object;
    }

    public get subject(): string{
        return this._subject;
    }
    public get object(): string{
        return this._object;
    }

    public static fromJSON(data: any): DemandeAICItemList{
        return new DemandeAICItemList(
            data.id,
            data.type_ddia,
            data.unit_name,
            data.airport_name,
            data.ident_ddia,
            new Date(data.deposit_datetime),
            data.state,
            data.subject,
            data.object,
            data.descriptive_text,
            data.url
        );
    }
}
