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
            await this.cognito.signUp(username, password, email, req.cookies);
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }

    public async signIn(req:Request, res:Response){
        let {username, password} = req.body;
        try{
            let token:string =  await this.cognito.signIn(username, password, req.cookies);
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
        try{
            await this.cognito.delete(req.cookies);
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }
}
