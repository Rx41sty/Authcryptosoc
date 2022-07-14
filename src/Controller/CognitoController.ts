import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';

export default class CSCognito{
    readonly clientId:string = process.env.AWS_COGNITO_CLIENT_ID!;
    private cognitoService:CognitoIdentityServiceProvider;
    constructor(){
        this.cognitoService = new AWS.CognitoIdentityServiceProvider();
    }

    public async signUp(username:string, password:string, email:string):Promise<Boolean>{
        var params = {
            ClientId: this.clientId,
            Username: username,
            Password: password,
            UserAttributes: [{Name: 'email', Value: email}]
        };

         try {
            const data = await this.cognitoService.signUp(params).promise();
            console.log(data);
        } catch (error) {
            console.log(error);
            return false;
        }

        return true;
    }
    
  public async signIn(username: string, password: string): Promise<boolean> {
    let params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        'USERNAME': username,
        'PASSWORD': password
      },
    }

    try {
      let data = await this.cognitoService.initiateAuth(params).promise();
      console.log(data); 
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  

}