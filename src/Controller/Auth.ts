import {Request, Response} from 'express';
import CognitoService from '../Service/Cognito';

import { CustomError, ErrorNM } from '../Error.js';
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
            res.cookie('token', token);//{httpOnly: true});
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }

    public async signout(req:Request, res:Response){
        res.clearCookie('token');
        this.handleResponse(res);
    }

    public async delete(req:Request, res:Response){
        let token:string = "";
        console.log("Tring to delete up in this bitch")
        if(req.cookies !== undefined && req.cookies['token'] !== undefined){
            token = req.cookies['token'];
        }else{
            this.handleException(res, new CustomError(ErrorNM.IncorrectToken));
            return;
        }
        
        try{
            await this.cognito.delete(token);
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }
}
