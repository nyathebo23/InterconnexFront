import { UnitSourceI } from '../interfaces/unit-source.interface';

export class UnitSource {
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _email: string;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _phonenumber: string;
    // tslint:disable-next-line:variable-name
    private _fax: string;
    // tslint:disable-next-line:variable-name
    private _address: string;
    // tslint:disable-next-line:variable-name
    private _rsfta: string;


    constructor(
        id: string,
        email: string,
        name: string,
        telephone: string,
        fax: string,
        address: string,
        rsfta?: string,
    ){
        this._id = id;
        this._email = email;
        this._name = name;
        this._phonenumber = telephone;
        this._fax = fax;
        this._address = address;
        this._rsfta = rsfta;
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

    get phonenumber(): string{
        return this._phonenumber;
    }

    get fax(): string{
        return this._fax;
    }

    get address(): string{
        return this._address;
    }

    get rsfta(): string{
        return this._rsfta;
    }

    public static fromJSON(data: UnitSourceI): UnitSource{
        return new UnitSource(
            data.id,
            data.email,
            data.name,
            data.phone_number,
            data.fax,
            data.address,
            data.rsfta,
        );
    }
}
