import { AttachmentI } from '../interfaces/attachement.interface';
import { DDIAHistoryI } from '../interfaces/ddia-history';
import { DemandeAICI } from '../interfaces/demande-aic.interface';
import { DDIAHistory } from './ddia-history.model';
import { DDIA } from './ddia.model';
import { Unit } from './unit.model';
import { UserInfos } from './user-infos.model';
import { User } from './user.model';

export class DemandeAIC extends DDIA {
    // tslint:disable-next-line:variable-name
    private _subject: string;
    // tslint:disable-next-line:variable-name
    private _object: string;
    // tslint:disable-next-line:variable-name
    private _text: string;

    constructor(
        id: string,
        identDDIA: string,
        depositDatetime: Date,
        locationInd: string,
        subject: string,
        object: string,
        text: string,
        state: string,
        unit: Unit,
        initiator: UserInfos,
        histor: DDIAHistory[],
        attachments: AttachmentI[]
    ){
        super(id, identDDIA, depositDatetime, locationInd, state, initiator, unit, histor, attachments);
        this._subject = subject;
        this._object = object;
        this._text = text;
    }

    get subject(): string{
        return this._subject;
    }

    get object(): string{
        return this._object;
    }

    get text(): string{
        return this._text;
    }

    public static fromJSON(data: DemandeAICI): DemandeAIC{
        const historiesData = new Array<DDIAHistory>();
        data.history.forEach((elt: DDIAHistoryI) => {
            historiesData.push(DDIAHistory.fromJSON(elt));
        });
        return new DemandeAIC(
            data.id,
            data.ident_ddia,
            data.deposit_datetime,
            data.location_indicator,
            data.subject,
            data.object,
            data.descriptive_text,
            data.state,
            Unit.fromJSON(data.unit),
            historiesData[0].agentObject.user,
            historiesData,
            data.attachments
        );
    }
}
