import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';

export default class CSCognito{
    readonly clientId:string = '1i4q9e2v032tbp3g31v7vu6klf';
    private pool:CognitoIdentityServiceProvider;
    constructor(){
        this.pool = new AWS.CognitoIdentityServiceProvider();
    }

    public async signUp(username:string, password:string, email:string):Promise<Boolean>{
        var params = {
            ClientId: this.clientId,
            Username: username,
            Password: password,
            UserAttributes: [{Name: 'email', Value: email}]
        };

         try {
            const data = await this.pool.signUp(params).promise();
            console.log(data);
        } catch (error) {
            console.log(error);
            return false;
        }

        return true;
    }

}