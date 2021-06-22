import { DDIA } from './ddia.model';
import { SourceUnit } from './source-unit.model';

class DemandeAIC extends DDIA {
    private _subject: string;
    private _object: string;
    private _text: string;

    constructor(
        id: string,
        identDDIA: string,
        depositDatetime: Date,
        locationInd: string,
        subject: string,
        object: string,
        text: string,
        state: string,
        unit: SourceUnit,
    ){
        super(id, identDDIA, depositDatetime, locationInd, state, unit);
        this._subject = subject;
        this._object = object;
        this._text = text;
    }

    get subject(): string{
        return this._subject;
    }

    get object(): string{
        return this._object;
    }

    get text(): string{
        return this._text;
    }
    public static fromJSON(data: {[key: string]: any}): DemandeAIC{
        return new DemandeAIC(
            data.id,
            data.ident_ddia,
            data.deposit_datetime,
            data.location_ind,
            data.object,
            data.subject,
            data.text,
            data.state,
            SourceUnit.fromJSON(data.unit)
        );
    }
}
