import { AerodromeI } from './aerodrome.interface';
import { NationalInformerI } from './national-informer.interface';
import { LocalInformerI } from './local-informer.interface';

interface UnitReduced {
    name: string;
    aerodrome_name: string;
}


export interface NotificationI {
    receiver_object: any;
    event: string;
    ddia_type: string;
    ref_ddia: string;
    new_ddia_state: string;
    date_time: string;
}
