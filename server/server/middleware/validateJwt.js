var validJwts = require("../jwt/validJwts");

const openEndpoints = (url, method) => {
    return new Promise((resolve, reject) => {
        // if it no an open route, I want to resolve, and reject open routes which do not need to verify jwt
        const splitUrlArray = url.split("/")
        const urlStub2 = `/${splitUrlArray[2]}`
        const urlStub3 = `/${splitUrlArray[2]}/${splitUrlArray[3]}`

        switch (method) {
            case "GET":
                if (urlStub2 === "/contributor") {
                    resolve();
                } else {
                    reject();
                }
                break;
            case "POST":
                if (urlStub3 === "/authentication/logout") {
                    resolve();
                } else {
                    reject();
                }
                break;
            case "PUT":
                resolve();
                break;
            case "DELETE":
                /*
                if (urlStub2 === "/message") {
                    reject();
                } else {
                    resolve();
                }
                */
                resolve();
                break;
            default:
                resolve();
        }
        return false;
    })
}

const tokenInJwtArray = (cookies) => {
    if ("identity_token" in cookies) {
        let result = (cookies.identity_token in validJwts)
        return true;
    } else {
        return false
    }
}

const validateJwt = function (req, res, next) {
    openEndpoints(req.url, req.method)
        .then(() => {
            const proceedValidToken = tokenInJwtArray(req.cookies);
            if (proceedValidToken) next();
        })
        .catch(() => {
            next();
        })
}
module.exports = validateJwt;