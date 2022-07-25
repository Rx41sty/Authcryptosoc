import { CognitoJwtVerifier } from 'aws-jwt-verify';
import {Request, Response, NextFunction} from 'express';

import { CustomError, ErrorNM } from '../Error.js';
import BaseController from './Base.js';

export default class VerifyController extends BaseController{
    constructor(){
        super();
    }
    public verifyToken = async (req:Request, res:Response, next:NextFunction) => {
        const verifier = CognitoJwtVerifier.create({
          userPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
          tokenUse: "access",
          clientId: process.env.AWS_COGNITO_CLIENT_ID!,
        });
      
        try {
            let token = req.cookies['token'];
            await verifier.verify(token);
            next();
        } catch(err:any) {
            this.handleException(res, new CustomError(ErrorNM.IncorrectToken));
        }
    }
}