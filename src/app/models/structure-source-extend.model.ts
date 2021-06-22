import { InformateurLocal } from './informateur-local.model';

export class StructureSourceExtend {
    private _id: string;
    private _name: string;
    private _code: string;
    private _locationInd: string;
    private _informateurLocal: InformateurLocal;
    private _units: Unit[];

    constructor(id: string,  name: string, code: string, locationInd: string, infLocal: InformateurLocal, units: Array<Unit>){
        this._id = id;
        this._name = name;
        this._code = code;
        this._locationInd = locationInd;
        this._informateurLocal = infLocal;
        this._units = units;
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

    set informateurLocal(infLocal: InformateurLocal){
        this._informateurLocal = infLocal;
    }

    public static fromJSON(data: {[key: string]: any}): StructureSourceExtend{
        const units = Array();
        data.units.array.forEach((element: {[key: string]: string}) => {
            units.push(Unit.fromJSON(element));
        });
        const infLocal = InformateurLocal.fromJSON(data.informateur_local);
        return new StructureSourceExtend(data.id, data.name, data.code, data.location_ind, infLocal, units);
    }
}
