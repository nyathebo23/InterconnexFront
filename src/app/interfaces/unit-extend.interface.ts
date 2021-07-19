import { AerodromeI } from './aerodrome.interface';

export interface UnitExtendI{
    id: string;
    email: string;
    name: string;
    telephone: string;
    fax: string;
    adress: string;
    rsfta: string;
    aerodrome: AerodromeI;
}
