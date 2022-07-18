import AWS from 'aws-sdk';
import { CustomError, ErrorNM } from '../Error.js';
export default class CognitoService {
    constructor() {
        this.clientId = process.env.AWS_COGNITO_CLIENT_ID;
        this.cognitoService = new AWS.CognitoIdentityServiceProvider();
    }
    async signUp(username, password, email) {
        var params = {
            ClientId: this.clientId,
            Username: username,
            Password: password,
            UserAttributes: [{ Name: 'email', Value: email }]
        };
        try {
            await this.cognitoService.signUp(params).promise();
        }
        catch (error) {
            if (error.code === "UsernameExistsException")
                throw new CustomError(ErrorNM.UsernameExists);
            console.log(error);
            throw new CustomError(ErrorNM.Unknown);
        }
    }
    async signIn(username, password) {
        let params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.clientId,
            AuthParameters: {
                'USERNAME': username,
                'PASSWORD': password
            },
        };
        try {
            await this.cognitoService.initiateAuth(params).promise();
        }
        catch (error) {
            if (error.code === "NotAuthorizedException")
                throw new CustomError(ErrorNM.NotAuthorized);
            console.log(error);
            throw new CustomError(ErrorNM.Unknown);
        }
    }
}
