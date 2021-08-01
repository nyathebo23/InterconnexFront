export class DDIABaseItemList {
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _ddiaType: string;
    // tslint:disable-next-line:variable-name
    private _unitName: string;
    // tslint:disable-next-line:variable-name
    private _airportName: string;
    // tslint:disable-next-line:variable-name
    private _identDDIA: string;
    // tslint:disable-next-line:variable-name
    private _depositDatetime: Date;
    // tslint:disable-next-line:variable-name
    private _state: string;
    // tslint:disable-next-line:variable-name
    private _text: string;
    // tslint:disable-next-line:variable-name
    private _url: string;

    constructor(
        id: string,
        ddiaType: string,
        unitName: string,
        aiportName: string,
        identDDIA: string,
        depositDatetime: Date,
        state: string,
        text: string,
        url: string
    ){
        this._id = id;
        this._ddiaType = ddiaType;
        this._unitName = unitName;
        this._airportName = aiportName;
        this._identDDIA = identDDIA;
        this._depositDatetime = depositDatetime;
        this._state = state;
        this._text = text;
        this._url = url;
    }
    public get id(): string{
        return this._id;
    }
    public get unitName(): string{
        return this._unitName;
    }
    public get airportName(): string{
        return this._airportName;
    }
    public get identDDIA(): string{
        return this._identDDIA;
    }
    public get depositDatetime(): Date{
        return this._depositDatetime;
    }
    public get state(): string{
        return this._state;
    }
    public set state(value: string) {
        this._state = value;
    }
    public get text(): string{
        return this._text;
    }
    public get ddiaType(): string {
        return this._ddiaType;
    }
    public get url(): string {
        return this._url;
    }
}
