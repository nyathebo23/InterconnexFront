import { LocalInformerI } from '../interfaces/local-informer.interface';

export class LocalInformer {
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _unit: string;
    // tslint:disable-next-line:variable-name
    private _aerodrome: string;

    constructor(id: string, name: string, unit?: string, aerodrome?: string) {
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


    public get aerodrome(): string {
        return this._aerodrome;
    }

    public get unit(): string {
        return this._unit;
    }

    public static fromJSON(data: LocalInformerI): LocalInformer{
        const localinf =  new LocalInformer(data.id, data.name, data.unit, data.aerodrome);
        return localinf;
    }
}
