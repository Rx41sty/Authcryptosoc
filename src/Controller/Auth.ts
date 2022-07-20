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
            let token:string =  await this.cognito.signIn(username, password);
            console.log(token);
            res.cookie('token', token);//{httpOnly: true});
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
            console.log(typeof cookie);
            console.log(cookie);
            await this.cognito.delete(cookie);
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }

    public async logout(req:Request, res:Response){
        
    }
}
