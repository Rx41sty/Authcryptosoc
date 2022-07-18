import {Request, Response} from 'express';
import CognitoService from '../Service/Cognito';
import BaseController from './Base.js';

export default class AuthController extends BaseController{
    private cognito:CognitoService;
    constructor(CognitoSC:CognitoService){
        super();
        this.cognito = CognitoSC;
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

    public async signUp(req:Request, res:Response){
        let {username, password, email} = req.body;
        try{
            await this.cognito.signUp(username, password, email);
            this.handleResponse(res);
        }catch(err:any){
            this.handleException(res, err);
        }
    }
}
