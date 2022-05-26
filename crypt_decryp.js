const crypto = require('crypto');
​
const algorithm = 'aes-256-cbc';
const salt = "14651" + "n5fxfRPUMFxy65G3WC99X5dNiVjoFVIdmrquNbXU";
const base = "n5fxfRPUMFxy65G3WC99X5dNiVjoFVIdmrquNbXU" + "14651";
const digest = 'sha256';
​
var text = "{'pan':'8505199586588314','expiry':{'month':'05','year':'2027'},'csc':'666', 'sucesso': '+15K no salarin'}"	
​
const iv = crypto.randomBytes(16);
console.log("VETOR:", iv.join().toString('base64'));
//AQEBAQEBAQEBAQEB
//AQEBAQEBAQEBAQEBAQEBAQ==
const cipherText = encrypt(text, base, salt);
​
const separator = " /_s_/ ";
const result = iv.toString('base64').slice(0,16) + separator + cipherText;
console.log("RESULT TO MOBILE:", result);
​
​
const plainText = decrypt(cipherText, base, salt);
console.log("result descriptografado:", plainText);
	
​
	function encrypt(plainText, base, salt) {
	
    const key = crypto.pbkdf2Sync(base, salt, 1000, 32, digest);
    console.log("SECRET_KEY:", key.toString('base64'));
    const cipher = crypto.createCipheriv(algorithm, key, iv.toString('base64').slice(0, 16));
    
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};
​
function decrypt(strToDecrypt, base, salt) {
​
    const key = crypto.pbkdf2Sync(base, salt, 1000, 32, digest);
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv.toString('base64').slice(0, 16));
    let decrypted = decipher.update(strToDecrypt, 'base64');
    decrypted += decipher.final();
    return decrypted;
};
