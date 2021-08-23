import { AttachmentI } from './attachement.interface';
import { DDIAHistoryI } from './ddia-history';
import { UnitI } from './unit.interface';

export interface DemandeSUPPAIPI{
    id: string;
    ident_ddia: string;
    deposit_datetime: Date;
    unit: UnitI;
    location_indicator: string;
    state: string;
    code_ddia_replaced: string;
    publication_code: string;
    type_suppaip: string;
    object: string;
    aip_target_sections: string;
    start_val_period: Date;
    end_val_period: Date;
    descriptive_text: string;
    attachments: AttachmentI[];
    history: DDIAHistoryI[];
}
