import { UserInfos } from './user-infos.model';


export class AgentObject {
    // tslint:disable-next-line: variable-name
    private _id: string;
    // tslint:disable-next-line: variable-name
    private _user: UserInfos;
    // tslint:disable-next-line: variable-name
    private _unit: string;
    // tslint:disable-next-line: variable-name
    private _localinformer: string;
    // tslint:disable-next-line: variable-name
    private _nationalinformer: string;
    // tslint:disable-next-line: variable-name
    private _aerodrome: string;

    constructor(id: string, user: UserInfos, aerodrome?: string, unit?: string, localinformer?: string, nationalinformer?: string){
        this._id = id;
        this._user = user;
        this._aerodrome = aerodrome;
        this._unit = unit;
        this._localinformer = localinformer;
        this._nationalinformer = nationalinformer;
    }

    get id(): string {
        return this._id;
    }

    get user(): UserInfos {
        return this._user;
    }

    get unit(): string {
        return this._unit;
    }

    get localinformer(): string {
        return this._localinformer;
    }

    get nationalinformer(): string {
        return this._nationalinformer;
    }

    get aerodrome(): string {
        return this._aerodrome;
    }


    public static fromJSON(data: any): AgentObject{
        return new AgentObject(data.id, UserInfos.fromJSON(data.user), data.aerodrome_name,
        data.unit_name, data.localinformer_name, data.nationalinf_name);
    }
}
