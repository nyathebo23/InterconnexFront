export class StructureSource{
    private _id: string;
    private _name: string;
    private _code: string;
    private _locationInd: string;

    constructor(id: string,  name: string, code: string, locationInd: string){
        this._id = id;
        this._name = name;
        this._code = code;
        this._locationInd = locationInd;
    }

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get code(): string{
        return this._code;
    }

    get locationInd(): string{
        return this._locationInd;
    }

    public static fromJSON(data: {[key: string]: string}): StructureSource{
        return new StructureSource(data.id, data.name, data.code, data.location_ind);
    }
}
