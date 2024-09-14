const crypto = require('crypto');

// Generate a random 256-bit key (32 bytes) and convert it to a hexadecimal string
const secretKey = crypto.randomBytes(32).toString('hex');

console.log(`Your JWT secret key is: ${secretKey}`);