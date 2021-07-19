import { AttachmentI } from './attachement.interface';
import { DDIAHistoryI } from './ddia-history';
import { UnitI } from './unit.interface';

export interface DemandeNOTAMI{
    id: string;
    ident_ddia: string;
    deposit_datetime: Date;
    unit: UnitI;
    location_indicator: string;
    state: string;
    publication_code: string;
    code_notam_replaceorcancel: string;
    range_action: string;
    type_notam: string;
    coords: string;
    validity_period_type: string;
    start_val_period: string;
    end_val_period: string;
    daily_freq_type: string;
    daily_freq_start: string;
    daily_freq_end: string;
    lower_vertical_limit: string;
    upper_vertical_limit: string;
    descriptive_text: string;
    attachments: AttachmentI[];
    history: DDIAHistoryI[];
}
