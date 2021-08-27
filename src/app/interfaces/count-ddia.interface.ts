import { AerodromeI } from './aerodrome.interface';

export interface CountDDIA {
    countAIC: number;
    countNOTAM: number;
    countSUPP: number;
}

export interface CountUnitDDIAI {
    unit: string;
    ddia_count: CountDDIA;
}

export interface CountAerodromeDDIAI {
    aerodrome: AerodromeI;
    ddia_count: CountDDIA;
}
