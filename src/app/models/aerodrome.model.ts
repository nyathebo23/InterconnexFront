import { AerodromeI } from '../interfaces/aerodrome.interface';

export class Aerodrome{
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _name: string;
    // tslint:disable-next-line:variable-name
    private _locationInd: string;
    // tslint:disable-next-line:variable-name
    private _isConceded: boolean;

    constructor(id: string,  name: string,  locationInd: string, isConceded: boolean){
        this._id = id;
        this._name = name;
        this._locationInd = locationInd;
        this._isConceded = isConceded;
    }

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get locationInd(): string{
        return this._locationInd;
    }

    get isConceded(): boolean {
        return this._isConceded;
    }

    public static fromJSON(data: AerodromeI): Aerodrome{
        return new Aerodrome(data.id, data.name,  data.location_ind, data.is_conceded);
    }
}
