import jwt from 'jsonwebtoken'
export async function authMiddleware(req,res,next){
    let token;

    if(req.headers.authorization){
        try{
            token = req.headers.authorization.split(" ")[1]
            
            if(token){
                const decoded = jwt.verify(token,process.env.SECRET)
                //console.log(decoded)
                req.userId = decoded?.id
            }
            next()

        }catch(e){
            console.log(e)
            res.status(401).json({msg:"Not authorized, token failed"})
        }
    }

    if(!token){
        res.status(401).json({msg:"Not authorized, no token detected"})
    }
}