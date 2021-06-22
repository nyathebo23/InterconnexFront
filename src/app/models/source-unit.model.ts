import { StructureSource } from './structure-source.model';

export class SourceUnit{
    private _id: string;
    private _email: string;
    private _name: string;
    private _telephone: string;
    private _fax: string;
    private _adress: string;
    private _rsfta: string;
    private _structureSource: StructureSource;

    constructor(
        id: string,
        email: string,
        name: string,
        telephone: string,
        fax: string,
        adress: string,
        rsfta: string,
        structureSource: StructureSource
    ){
        this._id = id;
        this._email = email;
        this._name = name;
        this._telephone = telephone;
        this._fax = fax;
        this._adress = adress;
        this._rsfta = rsfta;
        this._structureSource = structureSource;
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

    get structureSource(): StructureSource {
        return this._structureSource;
    }

    public static fromJSON(data: {[key: string]: any}): SourceUnit{
        const structureSource = StructureSource.fromJSON(data.structure_source);
        return new SourceUnit(
            data.id,
            data.email,
            data.name,
            data.telephone,
            data.fax,
            data.adress,
            data.rsfta,
            structureSource
        );
    }
}
