import { AttachmentI } from './attachement.interface';
import { UnitExtendI } from './unit-extend.interface';

export class DemandeNOTAMI{
    id: string;
    ident_ddia: string;
    deposit_datetime: Date;
    source_unit: UnitExtendI;
    state: string;
    publication_code;
    replaced_notam_code: string;
    range_action: string;
    type_notam: string;
    coords: string;
    period_type: string;
    start_validity_period: Date;
    end_validity_period: Date;
    daily_freq_start: string;
    daily_freq_end: string;
    inf_limit: string;
    sup_limit: string;
    attachments: AttachmentI[];
}
