import { DDIAModifHistoryI } from './ddia-modif-history.interface';
import { UserInfosI } from './user-info.interface';

export interface DDIAHistoryI {
    user: UserInfosI;
    type_action: string;
    modifshistory: DDIAModifHistoryI[];
    date_time: string;
}
