import { Time } from "@angular/common";
import { DDIA } from './ddia.model';
import { SourceUnit } from './source-unit.model';

class DemandeNOTAM extends DDIA{

    private _rangeAction: string;
    private _typeNOTAM: string;
    private _coords: string;
    private _periodType: string;
    private _startValidityPeriod: Date;
    private _endValidityPeriod: Date;
    private _dailyFreqStart: Time;
    private _dailyFreqEnd: Time;
    private _infLimit: string;
    private _supLimit: string;

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
        dailyFreqStart: Time,
        dailyFreqEnd: Time,
        infLimit: string,
        supLimit: string,
        unit: SourceUnit
    ){
        super(id, identDDIA, depositDatetime, locationInd, state, unit);
        this._rangeAction = rangeAction;
        this._typeNOTAM = typeNOTAM;
        this._coords = coords;
        this._periodType = periodType;
        this._startValidityPeriod = startValidityPeriod;
        this._endValidityPeriod = endValidityPeriod;
        this._dailyFreqStart = dailyFreqStart;
        this._dailyFreqEnd = dailyFreqEnd;
        this._infLimit = infLimit;
        this._supLimit = supLimit;
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

    public get dailyFreqStart(): Time {
        return this._dailyFreqStart;
    }

    public get dailyFreqEnd(): Time {
        return this._dailyFreqEnd;
    }

    public get infLimit(): string {
        return this._infLimit;
    }

    public get supLimit(): string {
        return this._supLimit;
    }

    public static fromJSON(data: {[key: string]: any}): DemandeNOTAM{
        return new DemandeNOTAM(
            data.id,
            data.ident_ddia,
            data.deposit_datetime,
            data.location_ind,
            data.state,
            data.range_action,
            data.type_notam,
            data.coords,
            data.period_type,
            data.start_val_period,
            data.end_val_period,
            data.daily_freq_start,
            data.daily_freq_end,
            data.lower_limit,
            data.upper_limit,
            SourceUnit.fromJSON(data.unit)
        );
    }
}
