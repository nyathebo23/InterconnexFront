import { UserInfosI } from '../interfaces/user-info.interface';

export class UserInfos{
    // tslint:disable-next-line:variable-name
    private _firstname: string;
    // tslint:disable-next-line:variable-name
    private _lastname: string;
    // tslint:disable-next-line:variable-name
    private _function: string;
    // tslint:disable-next-line:variable-name
    private _quality: string;
    // tslint:disable-next-line:variable-name
    private _role: string;
    // tslint:disable-next-line:variable-name
    private _sex: string;

    constructor(
        firstname: string,
        lastname: string,
        sex: string,
        rol?: string,
        funct?: string,
        quality?: string,
    ){
        this._firstname = firstname;
        this._lastname = lastname;
        this._role = rol;
        this._function = funct;
        this._quality = quality;
        this._sex = sex;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public get lastname(): string {
        return this._lastname;
    }

    public get function(): string {
        return this._function;
    }


    public get quality(): string {
        return this._quality;
    }


    public get role(): string {
        return this._role;
    }

    public get sex(): string {
        return this._sex;
    }

    public static fromJSON(data: UserInfosI): UserInfos{
        return new UserInfos(
            data.first_name,
            data.last_name,
            data.sex,
            data.role,
            data.function,
            data.quality,
        );
    }
}
