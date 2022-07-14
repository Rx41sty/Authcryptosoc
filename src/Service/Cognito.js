import AWS from 'aws-sdk';
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
                throw new Error("Username already exists");
            //At last
            console.log(error);
            throw new Error("Unknown error during registration");
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
                throw new Error("Username or password is incorrect");
            console.log(error);
            throw new Error("Unknown error during authentication");
        }
    }
}
