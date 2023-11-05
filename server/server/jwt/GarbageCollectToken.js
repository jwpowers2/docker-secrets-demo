const jwt = require("jsonwebtoken");

class GarbageCollectToken {
    collect(jwtObject){
        this.findExpiredTokens(jwtObject)
        .then(jwtObject=>{
            return jwtObject
        })
        
    }
    async findExpiredTokens(jwtObject){
        return new Promise((resolve, reject) =>{
            try {
                Object.keys(jwtObject).forEach(token=>{
                    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
                        if (err){
                            if (err.name === "TokenExpiredError"){
                                delete jwtObject[token]
                            }
                        }
                    })
                })
                resolve(jwtObject)
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = new GarbageCollectToken();