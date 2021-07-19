import { UserI } from '../interfaces/user.interface';

export class User{
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _username: string;
    // tslint:disable-next-line:variable-name
    private _email: string;
    // tslint:disable-next-line:variable-name
    private _firstname: string;
    // tslint:disable-next-line:variable-name
    private _lastname: string;
    // tslint:disable-next-line:variable-name
    private _functionn: string;
    // tslint:disable-next-line:variable-name
    private _quality: string;
    // tslint:disable-next-line:variable-name
    private _role: string;
    // tslint:disable-next-line:variable-name
    private _sex: string;

    constructor(
        id: string,
        username: string,
        email: string,
        firstname: string,
        lastname: string,
        sex: string,
        rol: string,
        funct?: string,
        quality?: string,
    ){
        this._id = id;
        this._username = username;
        this._email = email;
        this._firstname = firstname;
        this._lastname = lastname;
        this._role = rol;
        this._functionn = funct;
        this._quality = quality;
        this._sex = sex;
    }

    public get id(): string {
        return this._id;
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public get lastname(): string {
        return this._lastname;
    }


    public get function(): string {
        return this._functionn;
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

    public static fromJSON(data: UserI): User{
        return new User(
            data.id,
            data.username,
            data.email,
            data.firstname,
            data.lastname,
            data.sex,
            data.role,
            data.function,
            data.quality,
        );
    }
}
