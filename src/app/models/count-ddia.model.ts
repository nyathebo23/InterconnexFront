import { CountAerodromeDDIAI, CountDDIA, CountUnitDDIAI } from '../interfaces/count-ddia.interface';
import { Aerodrome } from './aerodrome.model';

export class CountUnitDDIA {
    // tslint:disable-next-line:variable-name
    private _unit: string;
    // tslint:disable-next-line:variable-name
    private _countDDIA: CountDDIA;

    constructor(unit: string, countDDIA: CountDDIA){
        this._unit = unit;
        this._countDDIA = countDDIA;
    }

    get unit(): string {
        return this._unit;
    }

    get countDDIA(): CountDDIA {
        return this._countDDIA;
    }

    public static fromJSON(data: CountUnitDDIAI): CountUnitDDIA{
        return new CountUnitDDIA(data.unit, data.ddia_count);
    }
}

export class CountAerodromeDDIA {
       // tslint:disable-next-line:variable-name
       private _aerodrome: Aerodrome;
       // tslint:disable-next-line:variable-name
       private _countDDIA: CountDDIA;

       constructor(airport: Aerodrome, countDDIA: CountDDIA){
           this._aerodrome = airport;
           this._countDDIA = countDDIA;
       }

       get aerodrome(): Aerodrome {
           return this._aerodrome;
       }

       get countDDIA(): CountDDIA {
           return this._countDDIA;
       }

       public static fromJSON(data: CountAerodromeDDIAI): CountAerodromeDDIA{
           return new CountAerodromeDDIA(
              Aerodrome.fromJSON(data.aerodrome), data.ddia_count
            );
       }
}
