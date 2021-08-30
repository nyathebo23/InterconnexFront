import { LocalInformer } from './local-informer.model';
import { Aerodrome } from './aerodrome.model';
import { NationalInformer } from './national-informer.model';
import { NotificationI } from '../interfaces/notification.interface';

class UnitReduced {
    // tslint:disable-next-line: variable-name
    private _name: string;
    // tslint:disable-next-line: variable-name
    private _aerodrome: string;

    constructor(name: string, aerodromeName: string){
        this._name = name;
        this._aerodrome = aerodromeName;
    }

    get name(): string {
        return this._name;
    }

    get aerodrome(): string {
        return this._aerodrome;
    }

    public static fromJSON(data): UnitReduced {
        return new UnitReduced(data.name, data.aerodrome_name);
    }
}

export class Notification {
    // tslint:disable-next-line:variable-name
    private _id: string;
    // tslint:disable-next-line:variable-name
    private _receiverStructure: UnitReduced | NationalInformer | LocalInformer | Aerodrome;
    // tslint:disable-next-line:variable-name
    private _event: string;
    // tslint:disable-next-line:variable-name
    private _typeDDIA: string;
    // tslint:disable-next-line:variable-name
    private _refDDIA: string;
    // tslint:disable-next-line:variable-name
    private _newDDIAState: string;
    // tslint:disable-next-line:variable-name
    private _read: boolean;
    // tslint:disable-next-line:variable-name
    private _datetime: Date;

    constructor(
        id: string, structure: UnitReduced | NationalInformer | LocalInformer | Aerodrome,
        event: string, typeDDIA: string, refDDIA: string, stateDDIA: string, datetime: Date, read: boolean
    )
    {
        this._id = id;
        this._receiverStructure = structure;
        this._event = event;
        this._typeDDIA = typeDDIA;
        this._datetime = datetime;
        this._refDDIA = refDDIA;
        this._newDDIAState = stateDDIA;
        this._read = read;
    }

    get id(): string {
        return this._id;
    }

    get receiverStructure(): UnitReduced | NationalInformer | LocalInformer | Aerodrome {
        return this._receiverStructure;
    }

    get event(): string {
        return this._event;
    }

    get refDDIA(): string {
        return this._refDDIA;
    }

    get typeDDIA(): string {
        return this._typeDDIA;
    }

    get datetime(): Date {
        return this._datetime;
    }

    get newDDIAState(): string {
        return this._newDDIAState;
    }

    get read(): boolean {
        return this._read;
    }

    set read(read: boolean){
        this._read = read;
    }

    public static fromJSON(data: NotificationI): Notification{
        let structure = null;
        if (data.receiver_object.is_authority){
            structure = NationalInformer.fromJSON(data.receiver_object);
        }
        else if (data.receiver_object.location_ind){
            structure = Aerodrome.fromJSON(data.receiver_object);
        }
        else if (data.receiver_object.aerodrome_name){
            structure = UnitReduced.fromJSON(data.receiver_object);
        }
        else {
            structure = LocalInformer.fromJSON(data.receiver_object);
        }
        return new Notification(
            data.id,
            structure,
            data.event,
            data.ddia_type,
            data.ref_ddia,
            data.new_ddia_state,
            new Date(data.date_time),
            data.read
        );
    }
}
