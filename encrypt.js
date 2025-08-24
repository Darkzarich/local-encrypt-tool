const crypto = require('crypto');

function encrypt(passphrase, password) {
  // Generate a random salt (16 bytes) and IV (12 bytes)
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  
  // Derive a key using PBKDF2
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  
  // Create cipher with AES-256-GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  // Encrypt the passphrase
  let encrypted = cipher.update(passphrase, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  
  // Combine salt, IV, authTag, and encrypted data
  return `${salt.toString('hex')}:${iv.toString('hex')}:${authTag}:${encrypted}`;
}

// Read input from command line
const passphrase = process.argv[2];
const password = process.argv[3];

if (!passphrase || !password) {
  console.error('Usage: node encrypt.js "<passphrase>" "<password>"');
  process.exit(1);
}

// Encrypt and output result
try {
  const result = encrypt(passphrase, password);
  console.log(result);
} catch (err) {
  console.error('Encryption failed:', err);
}
