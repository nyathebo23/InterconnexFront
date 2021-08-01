import { DDIAModifHistoryI } from './ddia-modif-history.interface';
import { UserInfosI } from './user-info.interface';

export interface DDIAHistoryI {
    agent_object: AgentObjectI | LocalAgentObjectI | NationalAgentObjectI;
    type_action: string;
    modifshistory: DDIAModifHistoryI[];
    date_time: string;
}

export interface AgentObjectI {
    id: string;
    user: UserInfosI;
    unit: {
        name: string;
        aerodrome_name: string;
    };
}

export interface LocalAgentObjectI {
    id: string;
    user: UserInfosI;
    localinformer: {
        name: string;
        aerodrome_name: string;
    };
}

export interface NationalAgentObjectI {
    id: string;
    user: UserInfosI;
    nationalinf_name: string;
}
