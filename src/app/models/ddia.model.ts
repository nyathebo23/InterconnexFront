import { AttachmentI } from '../interfaces/attachement.interface';
import { DDIAHistory } from './ddia-history.model';
import { Unit } from './unit.model';
import { UserInfos } from './user-infos.model';

export class DDIA {
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _identDDIA: string;
    // tslint:disable-next-line:variable-name
    private _depositDatetime: Date;
    // tslint:disable-next-line:variable-name
    private _locationIndicator: string;
    // tslint:disable-next-line:variable-name
    private _state: string;
    // tslint:disable-next-line:variable-name
    private _publicationCode;
    // tslint:disable-next-line:variable-name
    private _sourceUnit: Unit;
    // tslint:disable-next-line:variable-name
    private _initiator: UserInfos;
    // tslint:disable-next-line:variable-name
    private _history: DDIAHistory[];
    // tslint:disable-next-line:variable-name
    private _attachments: AttachmentI[];

    constructor(
        id: string,
        identDDIA: string,
        depositDatetime: Date,
        locationInd: string,
        state: string,
        initiator: UserInfos,
        sourceUnit: Unit,
        history: DDIAHistory[],
        attachs: AttachmentI[]
    ){
        this._id = id;
        this._identDDIA = identDDIA;
        this._depositDatetime = depositDatetime;
        this._locationIndicator = locationInd;
        this._state = state;
        this._sourceUnit = sourceUnit;
        this._initiator = initiator;
        this._history = history;
        this._attachments = attachs;
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

    get sourceUnit(): Unit{
        return this._sourceUnit;
    }

    get initiator(): UserInfos {
        return this._initiator;
    }

    get history(): DDIAHistory[] {
        return this._history;
    }

    get attachments(): AttachmentI[] {
        return this._attachments;
    }
}
