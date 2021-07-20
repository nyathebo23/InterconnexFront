import { AerodromeI } from '../interfaces/aerodrome.interface';
import { LocalInformerExtendI } from '../interfaces/local-informer-extend.interface';
import { UnitSourceI } from '../interfaces/unit-source.interface';
import { Aerodrome } from './aerodrome.model';
import { UnitSource } from './unit-source.model';

export class LocalInformerExtend {
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _unit: UnitSource;
    // tslint:disable-next-line:variable-name
    private _aerodrome: Aerodrome;

    constructor(id: string, name: string, unit?: UnitSource, aerodrome?: Aerodrome) {
        this._id = id;
        this._name = name;
        this._unit = unit;
        this._aerodrome = aerodrome;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }


    public get aerodrome(): Aerodrome {
        return this._aerodrome;
    }

    public set aerodrome(value: Aerodrome){
        this._aerodrome = value;
    }

    public get unit(): UnitSource {
        return this._unit;
    }

    public set unit(value: UnitSource){
        this._unit = value;
    }

    public static fromJSON(data: LocalInformerExtendI): LocalInformerExtend{
        const localinf =  new LocalInformerExtend(data.id, data.name);
        if (data.unit && data.aerodrome){
            localinf.unit =  UnitSource.fromJSON(data.unit);
            localinf.aerodrome = Aerodrome.fromJSON(data.aerodrome);
        }
        return localinf;
    }
}
