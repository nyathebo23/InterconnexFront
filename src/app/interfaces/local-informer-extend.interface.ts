import { AerodromeI } from './aerodrome.interface';
import { UnitSourceI } from './unit-source.interface';

export interface LocalInformerExtendI{
    id: string;
    name: string;
    unit?: UnitSourceI;
    aerodrome?: AerodromeI;
    // unit?: UnitI;
    // informateur_nat: NationalInformerI;
}
