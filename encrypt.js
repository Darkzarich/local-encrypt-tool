const crypto = require('crypto');

function encrypt(passphrase, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(passphrase, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  
  return `${salt.toString('hex')}:${iv.toString('hex')}:${authTag}:${encrypted}`;
}

const passphrase = process.argv[2];
const password = process.argv[3];

if (!passphrase || !password) {
  console.error('Usage: node encrypt.js "<passphrase>" "<password>"');
  process.exit(1);
}

try {
  const result = encrypt(passphrase, password);
  console.log(result);
} catch (err) {
  console.error('Encryption failed:', err);
}
