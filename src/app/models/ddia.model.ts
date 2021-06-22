import { SourceUnit } from './source-unit.model';

export class DDIA {
    private _id: string;
    private _identDDIA: string;
    private _depositDatetime: Date;
    private _locationIndicator: string;
    private _state: string;
    private _publicationCode;
    private _sourceUnit: SourceUnit;

    constructor(id: string, identDDIA: string, depositDatetime: Date, locationInd: string, state: string, sourceUnit: SourceUnit){
        this._id = id;
        this._identDDIA = identDDIA;
        this._depositDatetime = depositDatetime;
        this._locationIndicator = locationInd;
        this._state = state;
        this._sourceUnit = sourceUnit;
    }

    get id(): string{
        return this._id;
    }

    get identDDIA(): string{
        return this._identDDIA;
    }

    get depositDatetime(): Date{
        return this._depositDatetime;
    }

    get locationIndicator(): string{
        return this._locationIndicator;
    }

    get state(): string{
        return this._state;
    }

    set state(state: string){
        this._state = state;
    }

    set publicationCode(code: string){
        this._publicationCode = code;
    }

    get publicationCode(): string{
        return this._publicationCode;
    }

    get sourceUnit(): SourceUnit{
        return this._sourceUnit;
    }
}
