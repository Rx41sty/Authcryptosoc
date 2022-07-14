import AWS from 'aws-sdk';
export default class CSCognito {
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
            const data = await this.cognitoService.signUp(params).promise();
            console.log(data);
        }
        catch (error) {
            console.log(error);
            return false;
        }
        return true;
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
            let data = await this.cognitoService.initiateAuth(params).promise();
            console.log(data);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
