import { UserInfos } from './user-infos.model';

export class AgentObject {
    // tslint:disable-next-line: variable-name
    private _id: string;
    // tslint:disable-next-line: variable-name
    private _user: UserInfos;
    // private _unit: {name: string, aerodrome_name: string};

    constructor(id: string, user: UserInfos){
        this._id = id;
        this._user = user;
    }

    get id(): string {
        return this._id;
    }

    get user(): UserInfos {
        return this._user;
    }

    public static fromJSON(data: any): AgentObject{
        return new AgentObject(data.id, UserInfos.fromJSON(data.user));
    }
}
