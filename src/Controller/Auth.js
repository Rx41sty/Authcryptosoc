import BaseController from './Base.js';
export default class AuthController extends BaseController {
    constructor(CognitoSC) {
        super();
        this.cognito = CognitoSC;
    }
    async signIn(req, res) {
        let { username, password } = req.body;
        try {
            await this.cognito.signIn(username, password);
            this.handleResponse(res);
        }
        catch (err) {
            this.handleException(res, err);
        }
    }
    async signUp(req, res) {
        let { username, password, email } = req.body;
        try {
            await this.cognito.signUp(username, password, email);
            this.handleResponse(res);
        }
        catch (err) {
            this.handleException(res, err);
        }
    }
}
