const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch()
    
}





//1.using arroe function

// const asyncHandler=(requestHandler)=>async(req,res,next)=>{

//     try {
//         await requestHandler(req,res,next);
        
//     } catch (error) {
//         req.status(err.code || 500).json(
//             {
//                 success:false,
//                 message:err.message
//             }
//         )
//     }



// }


//  2) same code using normal function 


/*

function asyncHandler(requestHandler){
    return(
        async function (req,res,next){
            try {
                await requestHandler(req,res,next)
                
            } catch (error) {

                req.status(err.status || 500).json(
                    {
                        success:false,
                        message: error.message
                    }
                )
                
            }

        }
        
    )
}*/
