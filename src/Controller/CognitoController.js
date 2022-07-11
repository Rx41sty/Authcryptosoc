import AWS from 'aws-sdk';
export default class CSCognito {
    constructor() {
        this.clientId = '1i4q9e2v032tbp3g31v7vu6klf';
        this.pool = new AWS.CognitoIdentityServiceProvider();
    }
}
var params = {
    ClientId: '',
    Password: 'Zhan1k0931247$',
    Username: 'Jani',
    UserAttributes: [{ Name: 'email', Value: "zhani@gmail.com" }]
};
