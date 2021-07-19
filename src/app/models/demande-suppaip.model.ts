import { DDIAHistoryI } from '../interfaces/ddia-history';
import { DemandeSUPPAIPI } from '../interfaces/demande-supp.interface';
import { DDIAHistory } from './ddia-history.model';
import { DDIA } from './ddia.model';
import { SourceUnit } from './source-unit.model';
import { Unit } from './unit.model';

export class DemandeSUPPAIP extends DDIA{
    // tslint:disable-next-line:variable-name
    private _typeSUPPAIP: string;
    // tslint:disable-next-line:variable-name
    private _object: string;
    // tslint:disable-next-line:variable-name
    private _targetSection: string;
    // tslint:disable-next-line:variable-name
    private _startValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _endValidityPeriod: Date;
    // tslint:disable-next-line:variable-name
    private _descriptionText: string;
    // tslint:disable-next-line:variable-name
    private _replacedDDIACode: string;

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
        unit: Unit,
        histor: DDIAHistory[],
        replaceDDIACode?: string
    ){
        super(id, identDDIA, depositDatetime, locationInd, state, unit, histor);
        this._typeSUPPAIP = typeSUPPAIP;
        this._object = object;
        this._targetSection = targetSection;
        this._startValidityPeriod = startValidityPeriod;
        this._endValidityPeriod = endValidityPeriod;
        this._descriptionText = descriptionText;
        this._replacedDDIACode = replaceDDIACode;
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

    public get replacedDDIACode(): string {
        return this._replacedDDIACode;
    }

    public static fromJSON(data: DemandeSUPPAIPI): DemandeSUPPAIP{
        const historiesData = new Array<DDIAHistory>();
        data.history.forEach((elt: DDIAHistoryI) => {
            historiesData.push(DDIAHistory.fromJSON(elt));
        });
        return new DemandeSUPPAIP(
            data.id,
            data.ident_ddia,
            data.deposit_datetime,
            data.location_indicator,
            data.type_suppaip,
            data.object,
            data.aip_target_sections,
            data.start_validity_period,
            data.end_validity_period,
            data.descriptive_text,
            data.state,
            Unit.fromJSON(data.unit),
            historiesData,
            data.code_ddia_replaced
        );
    }
}
