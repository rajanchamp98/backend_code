

export default class ApiError extends Error{

    constructor(
        statusCode,
        message="something went wrong",
        errors=[],
        stack=""
    ){
        super(message),
        this.statusCode=statusCode,
        this.errors=errors,
        this.message=this.message,
        this.success=false

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.costructor)
        }
        
        

    }

}