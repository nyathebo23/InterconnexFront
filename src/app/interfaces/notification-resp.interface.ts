import { ActionOnDDIAI } from './action-on-ddia.interface';
import { NotificationI } from './notification.interface';

export interface NotificationResp {
    typeDDIA: string;
    user_id?: string;
    data?: any;
    notification: NotificationI;
}
