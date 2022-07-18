export default class BaseController{

    public handleException(){
        res.status(400).send(error: {code: err.getCode(), message: err.getMessage()});
    }
}