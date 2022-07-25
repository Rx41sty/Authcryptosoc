import { CognitoJwtVerifier } from 'aws-jwt-verify';
import {Request, Response, NextFunction} from 'express';

import { CustomError, ErrorNM } from '../Error.js';
import BaseController from './Base.js';
import CognitoService from '../Service/Cognito';

export default class VerifyController extends BaseController{
    private cognito:CognitoService;
    constructor(CognitoSC:CognitoService){
        super();
        this.cognito = CognitoSC;
    }
    public verifyToken = async (req:Request, res:Response, next:NextFunction) => {
        if(req.cookies === undefined || req.cookies['token'] === undefined ||
            !await this.cognito.isTokenAuthentic(req.cookies['token'])){
                this.handleException(res, new CustomError(ErrorNM.IncorrectToken));
                return;
        }
        next();
    }

}