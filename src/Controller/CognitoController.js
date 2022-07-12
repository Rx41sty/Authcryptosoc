import AWS from 'aws-sdk';
export default class CSCognito {
    constructor() {
        this.clientId = '1i4q9e2v032tbp3g31v7vu6klf';
        this.pool = new AWS.CognitoIdentityServiceProvider();
    }
    async signUp(username, password, email) {
        var params = {
            ClientId: this.clientId,
            Username: username,
            Password: password,
            UserAttributes: [{ Name: 'email', Value: email }]
        };
        try {
            const data = await this.pool.signUp(params).promise();
            console.log(data);
        }
        catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}
