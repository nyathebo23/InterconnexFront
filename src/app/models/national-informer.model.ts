import { NationalInformerI } from '../interfaces/national-informer.interface';

export class NationalInformer{
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _isAuthority: boolean;

    constructor(id: string, name: string, isAuthority: boolean) {
        this._id = id;
        this._name = name;
        this._isAuthority = isAuthority;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get isAuthority(): boolean {
        return this._isAuthority;
    }

    public static fromJSON(data: NationalInformerI): NationalInformer{
        return new NationalInformer(data.id, data.name, data.is_authority);
    }
}
