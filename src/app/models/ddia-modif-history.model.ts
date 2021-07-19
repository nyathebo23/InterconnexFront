import { DDIAModifHistoryI } from '../interfaces/ddia-modif-history.interface';

export class DDIAModifHistory {
    // tslint:disable-next-line: variable-name
    private _prevValue: string;
    // tslint:disable-next-line: variable-name
    private _newValue: string;
    // tslint:disable-next-line: variable-name
    private _field: string;

    constructor(prevVal: string, newVal: string, field: string){
        this._prevValue = prevVal;
        this._newValue = newVal;
        this._field = field;
    }

    public get prevValue(): string{
        return this._prevValue;
    }
    public get newValue(): string{
        return this._newValue;
    }
    public get field(): string{
        return this._field;
    }

    public static fromJSON(data: DDIAModifHistoryI): DDIAModifHistory{
        return new DDIAModifHistory(data.prev_value, data.new_value, data.field);
    }
}
