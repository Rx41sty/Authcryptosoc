import {Request, Response} from 'express';
import {CustomError, ErrorNM} from '../Error.js';

export default class BaseService{
    public handleUnkownException(){
        console.log(err);
        throw new CustomError(ErrorNM.Unknown);
    }
}