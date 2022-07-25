export class CustomError extends Error{
    private errorMap = new Map([
        [ErrorNM.UsernameExists, "Username Already Exists"],
        [ErrorNM.NotAuthorized, "Username or password is incorrect"],
        [ErrorNM.IncorrectToken, "You are not logged in"],
        [ErrorNM.UserNotConfirmed, "Username is not confirmed"],
        [ErrorNM.UserNotFound, "User does not exist"],
        [ErrorNM.UserAuthenticated, "Please log out and try again"],
        [ErrorNM.InvalidParameter, "Parameters are not provided"],
        [ErrorNM.Unknown, "Unknown error"]
    ]);
    constructor(private readonly errorCode: number) {
        super();
    }

    public getMessage():string{
        return this.errorMap.get(this.errorCode)!;
    }

    public getErrorCode():number{
        return this.errorCode!;
    }
}

export enum ErrorNM{
    UsernameExists,
    NotAuthorized,
    IncorrectToken,
    UserNotConfirmed,
    UserNotFound,
    UserAuthenticated,
    InvalidParameter,
    

    Unknown
}