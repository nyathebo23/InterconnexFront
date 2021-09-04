import { AttachmentI } from './attachement.interface';
import { DDIAHistoryI } from './ddia-history';
import { RequestReferralI } from './request-referral.interface';
import { UnitI } from './unit.interface';

export interface DemandeAICI{
    id: string;
    ident_ddia: string;
    deposit_datetime: Date;
    unit: UnitI;
    location_indicator: string;
    state: string;
    publication_code: string;
    subject: string;
    object: string;
    descriptive_text: string;
    attachments: AttachmentI[];
    history: DDIAHistoryI[];
    request_referrals: RequestReferralI[];
}
