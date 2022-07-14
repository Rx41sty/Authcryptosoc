import {Request, Response} from 'express';
export default class AuthController {

    constructor(){
    }

    public signIn(req:Request, res:Response){

    }
    private verifySignIn(){
        let {username, password} = req.body;
        if(username !== null && password !== null){

        }
    }
}
