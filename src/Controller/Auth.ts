import {Request, Response} from 'express';
import { CustomError, ErrorNM } from '../Error.js';
import CognitoService from '../Service/Cognito';
import BaseController from './Base.js';

export default class AuthController extends BaseController{
    private cognito:CognitoService;
    constructor(CognitoSC:CognitoService){
        super();
        this.cognito = CognitoSC;
    }

    public async signUp(req:Request, res:Response){
        let {username, password, email} = req.body;
        try{
            await this.cognito.signUp(username, password, email);
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }

    public async signIn(req:Request, res:Response){
        let {username, password} = req.body;
        try{
            await this.cognito.signIn(username, password);
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }

    public async delete(req:Request, res:Response){
        let cookie:string = "";
        
        if(req.headers.cookie !== undefined){
            cookie = req.headers.cookie;
        }else{
            this.handleException(res, new CustomError(ErrorNM.IncorrectToken));
            return;
        }
        
        try{
            await this.cognito.delete(cookie);
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }
}
