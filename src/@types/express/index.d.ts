import { IUser } from "src/models/User";

declare module 'express' {
    export interface Request  {
        body: {
            user: IUser
        };
    }
}
