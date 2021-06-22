import { AttachmentI } from './attachement.interface';
import { UnitExtendI } from './unit-extend.interface';

export class DemandeAICI{
    id: string;
    ident_ddia: string;
    deposit_datetime: Date;
    source_unit: UnitExtendI;
    state: string;
    publication_code;
    subject: string;
    object: string;
    text: string;
    attachments: AttachmentI[];
}
