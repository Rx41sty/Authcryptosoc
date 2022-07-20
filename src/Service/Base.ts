import {CustomError, ErrorNM} from '../Error.js';

export default class BaseService{
    public handleUnkownException(err:any):never{
        console.log(err);
        throw new CustomError(ErrorNM.Unknown);
    }
}