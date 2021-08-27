import { RequestReferralI } from '../interfaces/request-referral.interface';

export class RequestReferral {
    // tslint:disable-next-line:variable-name
    private _message: string;
    // tslint:disable-next-line:variable-name
    private _datetime: Date;

    constructor(message: string, datetime: Date){
        this._message = message;
        this._datetime = datetime;
    }

    get message(): string {
        return this._message;
    }

    get datetime(): Date {
        return this._datetime;
    }

    public static fromJSON(data: RequestReferralI): RequestReferral {
        if (data){
            return new RequestReferral(data.message, new Date(data.date_time));
        }
        return null;
    }
}
