import { AttachmentI } from '../interfaces/attachement.interface';
import { DDIAHistoryI } from '../interfaces/ddia-history';
import { DemandeNOTAMI } from '../interfaces/demande-notam.interface';
import { DDIAHistory } from './ddia-history.model';
import { DDIA } from './ddia.model';
import { RequestReferral } from './request-referral.model';
import { Unit } from './unit.model';
import { UserInfos } from './user-infos.model';

export class DemandeNOTAM extends DDIA{

    // tslint:disable-next-line:variable-name
    private _rangeAction: string;
    // tslint:disable-next-line:variable-name
    private _typeNOTAM: string;
    // tslint:disable-next-line:variable-name
    private _coords: string;
    // tslint:disable-next-line:variable-name
    private _periodType: string;
    // tslint:disable-next-line:variable-name
    private _startValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _endValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _dailyFreqType: string;
    // tslint:disable-next-line:variable-name
    private _dailyFreqStart: string;
    // tslint:disable-next-line:variable-name
    private _dailyFreqEnd: string;
    // tslint:disable-next-line:variable-name
    private _lowerVerticalLimit: string;
    // tslint:disable-next-line:variable-name
    private _upperVerticalLimit: string;
    // tslint:disable-next-line:variable-name
    private _replaceorcancelNOTAMCode: string;
    // tslint:disable-next-line:variable-name
    private _text: string;

    constructor(
        id: string,
        identDDIA: string,
        depositDatetime: Date,
        locationInd: string,
        state: string,
        rangeAction: string,
        typeNOTAM: string,
        coords: string,
        periodType: string,
        startValidityPeriod: Date,
        endValidityPeriod: Date,
        dailyFreqType: string,
        dailyFreqStart: string,
        dailyFreqEnd: string,
        lowerVerticalLimit: string,
        upperVerticalLimit: string,
        unit: Unit,
        text: string,
        initiator: UserInfos,
        histor: DDIAHistory[],
        attachments: AttachmentI[],
        referral: RequestReferral,
        replaceorcancelNOTAMCode?: string,

    ){
        super(id, identDDIA, depositDatetime, locationInd, state, initiator, unit, histor, attachments, referral);
        this._rangeAction = rangeAction;
        this._typeNOTAM = typeNOTAM;
        this._coords = coords;
        this._periodType = periodType;
        this._startValidityPeriod = startValidityPeriod;
        this._endValidityPeriod = endValidityPeriod;
        this._dailyFreqStart = dailyFreqStart;
        this._dailyFreqEnd = dailyFreqEnd;
        this._lowerVerticalLimit = lowerVerticalLimit;
        this._upperVerticalLimit = upperVerticalLimit;
        this._text = text;
        this._replaceorcancelNOTAMCode = replaceorcancelNOTAMCode;
    }

    public get rangeAction(): string {
        return this._rangeAction;
    }

    public get typeNOTAM(): string {
        return this._typeNOTAM;
    }

    public get coords(): string {
        return this._coords;
    }

    public get periodType(): string {
        return this._periodType;
    }

    public get startValidityPeriod(): Date {
        return this._startValidityPeriod;
    }

    public get endValidityPeriod(): Date {
        return this._endValidityPeriod;
    }

    public get dailyFreqStart(): string {
        return this._dailyFreqStart;
    }

    public get dailyFreqEnd(): string {
        return this._dailyFreqEnd;
    }

    public get lowerVerticalLimit(): string {
        return this._lowerVerticalLimit;
    }

    public get upperVerticalLimit(): string {
        return this._upperVerticalLimit;
    }

    public get replaceorcancelNOTAMCode(): string {
        return this._replaceorcancelNOTAMCode;
    }

    public get text(): string {
        return this._text;
    }

    public get dailyFreqType(): string {
        return this._dailyFreqType;
    }

    public static fromJSON(data: DemandeNOTAMI): DemandeNOTAM{
        const historiesData = new Array<DDIAHistory>();
        data.history.forEach((elt: DDIAHistoryI) => {
            historiesData.push(DDIAHistory.fromJSON(elt));
        });
        return new DemandeNOTAM(
            data.id,
            data.ident_ddia,
            data.deposit_datetime,
            data.location_indicator,
            data.state,
            data.range_action,
            data.type_notam,
            data.coords,
            data.validity_period_type,
            new Date(data.start_val_period),
            new Date(data.end_val_period),
            data.daily_freq_type,
            data.daily_freq_start,
            data.daily_freq_end,
            data.lower_vertical_limit,
            data.upper_vertical_limit,
            Unit.fromJSON(data.unit),
            data.descriptive_text,
            historiesData[0].agentObject.user,
            historiesData,
            data.attachments,
            RequestReferral.fromJSON(data.request_referral),
            data.code_notam_replaceorcancel
        );
    }
}
