import { Aerodrome } from './aerodrome.model';

export class SourceUnit{
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _email: string;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _telephone: string;
    // tslint:disable-next-line:variable-name
    private _fax: string;
    // tslint:disable-next-line:variable-name
    private _adress: string;
    // tslint:disable-next-line:variable-name
    private _rsfta: string;
    // tslint:disable-next-line:variable-name
    private _aerodrome: Aerodrome;

    constructor(
        id: string,
        email: string,
        name: string,
        telephone: string,
        fax: string,
        adress: string,
        rsfta: string,
        aerodrome: Aerodrome
    ){
        this._id = id;
        this._email = email;
        this._name = name;
        this._telephone = telephone;
        this._fax = fax;
        this._adress = adress;
        this._rsfta = rsfta;
        this._aerodrome = aerodrome;
    }

    get id(): string{
        return this._id;
    }

    get email(): string{
        return this._email;
    }

    get name(): string{
        return this._name;
    }

    get telephone(): string{
        return this._telephone;
    }

    get fax(): string{
        return this._fax;
    }

    get adress(): string{
        return this._adress;
    }

    get rsfta(): string{
        return this._rsfta;
    }

    get aerodrome(): Aerodrome {
        return this._aerodrome;
    }

    // public static fromJSON(data: {[key: string]: any}): SourceUnit{
    //     const Aerodrome = Aerodrome.fromJSON(data.structure_source);
    //     return new SourceUnit(
    //         data.id,
    //         data.email,
    //         data.name,
    //         data.telephone,
    //         data.fax,
    //         data.adress,
    //         data.rsfta,
    //         Aerodrome
    //     );
    // }
}
