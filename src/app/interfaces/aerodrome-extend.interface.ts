import { LocalInformerI } from './local-informer.interface';
import { UnitLite } from './unit-lite.interface';

export interface AerodromeExtendI{
    id: string;
    name: string;
    units: UnitLite[];
    localinformer?: LocalInformerI;
}

