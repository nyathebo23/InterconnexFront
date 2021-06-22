import { User } from './user.model';
import { SourceUnit } from './source-unit.model';

export class Agent {
    private _id: string;
    private _user: User;
    private _unit: SourceUnit;


    constructor(id: string, user: User, unit: SourceUnit){
        this._id = id;
        this._user = user;
        this._unit = unit;
    }

    public get id(): string {
        return this._id;
    }

    public get user(): User {
        return this._user;
    }

    public get unit(): SourceUnit {
        return this._unit;
    }


    public static fromJSON(data: {[key: string]: any}): Agent{
        const user = User.fromJSON(data.user);
        const unit = SourceUnit.fromJSON(data.unit);
        return new Agent(data.id, user, unit);
    }
}
