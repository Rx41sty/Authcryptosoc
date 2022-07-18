import {Request, Response} from 'express';
import {CustomError, ErrorNM} from '../Error';

export default class BaseController{
    public handleException(res:Response, err:CustomError){
        res.status(400).send({error: {code: err.getErrorCode(), message: err.getMessage()}});
    }
    public handleResponse(res:Response){
        res.status(200).send({data:{success:true}});
    }
}