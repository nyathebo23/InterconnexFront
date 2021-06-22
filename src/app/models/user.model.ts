export class User{
    private _id: string;
    private _username: string;
    private _email: string;
    private _firstname: string;
    private _lastname: string;
    private _functionn: string;
    private _quality: string;
    private _role: string;

    constructor(
        id: string,
        username: string,
        email: string,
        firstname: string,
        lastname: string,
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


    public get functionn(): string {
        return this._functionn;
    }


    public get quality(): string {
        return this._quality;
    }


    public get role(): string {
        return this._role;
    }

    public static fromJSON(data: {[key: string]: string}): User{
        return new User(
            data.id,
            data.username,
            data.email,
            data.firstname,
            data.lastname,
            data.role,
            data.function,
            data.quality,
        );
    }
}
