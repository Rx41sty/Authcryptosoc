import {Request, Response} from 'express';
import CognitoService from '../Service/Cognito';
export default class AuthController {
    private cognito:CognitoService;
    constructor(CognitoSC:CognitoService){
        this.cognito = CognitoSC;
    }

    public async signIn(req:Request, res:Response){
        let {username, password} = req.body;
        try{
            await this.cognito.signIn(username, password);
            res.status(200).send("Successfully authenticated");
        }catch(err:any){
            res.status(400).send(err.message);
        }
    }

    public async signUp(req:Request, res:Response){
        let {username, password, email} = req.body;
        try{
            await this.cognito.signUp(username, password, email);
            res.status(200).send("Successfully Registered");
        }catch(err:any){
            res.status(400).send(err.message);
        }
    }
}
