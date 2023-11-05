var CryptoJS = require('crypto-js');
const secrets = require('../../secrets')
require('dotenv').config()

class CryptoTools {
    encrypt(plainText){
        return new Promise((resolve, reject)=>{
            try {
                resolve(CryptoJS.AES.encrypt(plainText, secrets.read('/run/secrets/TOKEN_SECRET').toString())) 
            } catch(err){
                reject(err)
            }
        })
    }
    decrypt(cipherText){
        return new Promise((resolve, reject)=>{
            try {
                var bytes  = CryptoJS.AES.decrypt(cipherText, secrets.read('/run/secrets/TOKEN_SECRET'));
                resolve(bytes.toString(CryptoJS.enc.Utf8))
            } catch (e) {
                reject(e);
            }
        })
    }

}
module.exports = new CryptoTools();