export default class AuthController {
    constructor(CognitoSC) {
        this.cognito = CognitoSC;
    }
    async signIn(req, res) {
        let { username, password } = req.body;
        try {
            await this.cognito.signIn(username, password);
            res.status(200).send("Successfully authenticated");
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }
    async signUp(req, res) {
        let { username, password, email } = req.body;
        try {
            await this.cognito.signUp(username, password, email);
            res.status(200).send("Successfully Registered");
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }
}
