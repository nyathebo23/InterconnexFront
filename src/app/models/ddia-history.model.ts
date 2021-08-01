import { DDIAHistoryI } from '../interfaces/ddia-history';
import { DDIAModifHistoryI } from '../interfaces/ddia-modif-history.interface';
import { AgentObject } from './agent-object.model';
import { DDIAModifHistory } from './ddia-modif-history.model';
import { UserInfos } from './user-infos.model';
import { User } from './user.model';

export class DDIAHistory {
    // tslint:disable-next-line: variable-name
    private _agentObject: AgentObject;
    // tslint:disable-next-line: variable-name
    private _typeAction: string;
    // tslint:disable-next-line: variable-name
    private _modifsHistory: DDIAModifHistory[];
    // tslint:disable-next-line: variable-name
    private _datetime: Date;

    constructor(agent: AgentObject, typeAction: string, modifsHistory: DDIAModifHistory[], datetime: Date){
        this._agentObject = agent,
        this._typeAction = typeAction;
        this._modifsHistory = modifsHistory;
        this._datetime = datetime;
    }

    get agentObject(): AgentObject {
        return this._agentObject;
    }

    get typeAction(): string {
        return this._typeAction;
    }

    get modifsHistory(): DDIAModifHistory[]{
        return this._modifsHistory;
    }

    get datetime(): Date {
        return this._datetime;
    }

    public static fromJSON(data: DDIAHistoryI): DDIAHistory{
        console.log(data);
        const modifsHistory = Array<DDIAModifHistory>();
        data.modifshistory.forEach((elt: DDIAModifHistoryI) => {
            modifsHistory.push(DDIAModifHistory.fromJSON(elt));
        });
        return new DDIAHistory(
            AgentObject.fromJSON(data.agent_object),
            data.type_action,
            modifsHistory,
            new Date(data.date_time)
        );
    }
}
