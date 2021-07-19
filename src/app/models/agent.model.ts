import { Aerodrome } from './aerodrome.model';
import { Unit } from './unit.model';
import { User } from './user.model';

export class Agent {
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _user: User;
    // tslint:disable-next-line:variable-name
    private _unit: Unit;
    // tslint:disable-next-line:variable-name
    private _aerodrome: Aerodrome;

    constructor(id: string, user: User, unit: Unit, aerodrome: Aerodrome){
        this._id = id;
        this._user = user;
        this._unit = unit;
        this._aerodrome = aerodrome;
    }

    public get id(): string {
        return this._id;
    }

    public get user(): User {
        return this._user;
    }

    public get unit(): Unit {
        return this._unit;
    }

    public get aerodrome(): Aerodrome {
        return this._aerodrome;
    }


    // public static fromJSON(data: {[key: string]: any}): Agent{
    //     const user = User.fromJSON(data.user);
    //     const unit = SourceUnit.fromJSON(data.unit);
    //     return new Agent(data.id, user, unit);
    // }
}
