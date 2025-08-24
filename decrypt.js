const crypto = require('crypto');

function decrypt(encryptedData, password) {
  const [saltHex, ivHex, authTagHex, encryptedHex] = encryptedData.split(':');
  const salt = Buffer.from(saltHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const passphrase = process.argv[2];
const password = process.argv[3];

if (!passphrase || !password) {
  console.error('Usage: node decrypt.js "<passphrase>" "<password>"');
  process.exit(1);
}

try {
  const result = decrypt(passphrase, password);
  console.log(result);
} catch (err) {
  console.error('Encryption failed:', err);
}
