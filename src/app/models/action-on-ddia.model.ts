import { DemandeAICItemList } from './demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from './demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from './demandeSUPP-item-list.model';
import { DDIAItemList } from './ddia-item-list.model';
import { ActionOnDDIAI } from '../interfaces/action-on-ddia.interface';

export class ActionOnDDIA {
    // tslint:disable-next-line: variable-name
    private _ddiaObject: DemandeAICItemList | DemandeNOTAMItemList | DemandeSUPPItemList;
    // tslint:disable-next-line:variable-name
    private _prevState: string;
    // tslint:disable-next-line:variable-name
    private _newState: string;
    // tslint:disable-next-line:variable-name
    private _datetime: Date;

    constructor(
        ddiaObject: DemandeAICItemList | DemandeNOTAMItemList | DemandeSUPPItemList,
        newState: string,
        prevState: string,
        datetime: Date
    ){
        this._ddiaObject = ddiaObject;
        this._newState = newState;
        this._prevState = prevState;
        this._datetime = datetime;
    }

    get ddiaObject(): DemandeAICItemList | DemandeNOTAMItemList | DemandeSUPPItemList {
        return this._ddiaObject;
    }

    get newState(): string {
        return this._newState;
    }

    get prevState(): string {
        return this._prevState;
    }

    get datetime(): Date {
        return this._datetime;
    }

    public static fromJSON(data: ActionOnDDIAI): ActionOnDDIA{
        return new ActionOnDDIA(
            DDIAItemList.fromJSON(data.ddia_object),
            data.new_state,
            data.prev_state,
            new Date(data.date_time)
        );
    }
}
