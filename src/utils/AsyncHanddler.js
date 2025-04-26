



//! by using promises 


const AsyncHanddler=(requestHandler)=>{
    (req , res , next)=>{
        Promise.resolve(requestHandler(req, res ,next)).catch((err)=>next(err))
    }
}
export {AsyncHanddler}

//! try catch wala
// const AsyncHanddler=(fn )=>async ( err , req , res , next )=>{
// try {
//     await fn(err, res, req, next)
// } catch (error) {
// res.status(err.code || 500 ).json({
//     success:false,
//     message:err.message
// })
// }
// }




























