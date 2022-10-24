const crypto = require('crypto');

const cipher = {};

cipher.stretchString = (s, salt, outputLength) => {
    return crypto.pbkdf2Sync(s, salt, 100000, outputLength, 'sha512');
  }

cipher.keyFromPassword = (password) => {
    const keyPlusHashingSalt = cipher.stretchString(password, 'salt', 24 + 48);
    return {
        cipherKey: keyPlusHashingSalt.slice(0,24), 
        hashingSalt: keyPlusHashingSalt.slice(24)
    };
}

cipher.encrypt = (key, sourceData) => {
    const iv = Buffer.alloc(16, 0); // Initialization vector
    const cipher = crypto.createCipheriv('aes-192-cbc', key.cipherKey, iv);
    let encrypted = cipher.update(sourceData, 'binary', 'binary');
    encrypted += cipher.final('binary');
    return encrypted;
}

cipher.decrypt = (key, encryptedData) => {
    const iv = Buffer.alloc(16, 0); // Initialization vector
    const decipher = crypto.createDecipheriv('aes-192-cbc', key.cipherKey, iv);
    let decrypted = decipher.update(encryptedData, 'binary', 'binary');
    decrypted += decipher.final('binary');
    return decrypted;
}

module.exports = cipher;