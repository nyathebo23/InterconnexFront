import { Time } from "@angular/common";
import { DDIA } from './ddia.model';
import { SourceUnit } from './source-unit.model';

class DemandeSUPPAIP extends DDIA{
    private _typeSUPPAIP: string;
    private _object: string;
    private _targetSection: string;
    private _startValidityPeriod: Date;
    private _endValidityPeriod: Date;
    private _descriptionText: string;

    constructor(
        id: string,
        identDDIA: string,
        depositDatetime: Date,
        locationInd: string,
        typeSUPPAIP: string,
        object: string,
        targetSection: string,
        startValidityPeriod: Date,
        endValidityPeriod: Date,
        descriptionText: string,
        state: string,
        unit: SourceUnit
    ){
        super(id, identDDIA, depositDatetime, locationInd, state, unit);
        this._typeSUPPAIP = typeSUPPAIP;
        this._object = object;
        this._targetSection = targetSection;
        this._startValidityPeriod = startValidityPeriod;
        this._endValidityPeriod = endValidityPeriod;
        this._descriptionText = descriptionText;
    }

    public get typeSUPPAIP(): string {
        return this._typeSUPPAIP;
    }

    public get object(): string {
        return this._object;
    }

    public get targetSection(): string {
        return this._targetSection;
    }

    public get startValidityPeriod(): Date {
        return this._startValidityPeriod;
    }

    public get endValidityPeriod(): Date {
        return this._endValidityPeriod;
    }

    public get descriptionText(): string {
        return this._descriptionText;
    }

    public static fromJSON(data: {[key: string]: any}): DemandeSUPPAIP{
        return new DemandeSUPPAIP(
            data.id,
            data.ident_ddia,
            data.deposit_datetime,
            data.location_ind,
            data.type_supp_aip,
            data.object,
            data.target_section,
            data.start_val_period,
            data.end_val_period,
            data.description_text,
            data.state,
            SourceUnit.fromJSON(data.unit)
        );
    }
}
