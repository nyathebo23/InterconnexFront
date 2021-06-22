import { AttachmentI } from './attachement.interface';
import { UnitExtendI } from './unit-extend.interface';

export class DemandeSUPPAIPI{
    id: string;
    ident_ddia: string;
    deposit_datetime: Date;
    source_unit: UnitExtendI;
    state: string;
    replaced_notam_code: string;
    publication_code;
    type_suppaip: string;
    object: string;
    target_section: string;
    start_validity_period: Date;
    end_validity_period: Date;
    description_text: string;
    attachments: AttachmentI[];

}
