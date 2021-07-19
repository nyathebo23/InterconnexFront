import { NationalInformerI } from '../interfaces/national-informer.interface';

export class NationalInformer{
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _name: string;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public static fromJSON(data: NationalInformerI): NationalInformer{
        return new NationalInformer(data.id, data.name);
    }
}
