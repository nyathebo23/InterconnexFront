import { NationalInformerI } from './national-informer.interface';

export class LocalInformerI{
    id: string;
    name: string;
    informateur_nat: NationalInformerI;
}
