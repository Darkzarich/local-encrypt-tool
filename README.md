# Local Encrypt Tool

Simple encrypt and decrypt tools to store a sensitive string encrypted with a password. Uses AES-256-GCM encryption with a key derived from your password using PBKDF2.
Doesn't use any external libraries or dependencies, just Node.js built-in crypto module.

## Requirements

- [Node.js](https://nodejs.org/en/)

## Usage

### Encrypt

```bash
$ node decrypt.js <sensitive_string> <password>
```

#### Example

```bash
$ node decrypt.js "Hello World" "my_password"

> 960554fa328ba523edc73123fc84868c:209df78d93c5e82f3474cdca:f401b6c43247d4a0806a6433e10de461:561748277a7e56ebea6ef2
```

### Decrypt

```bash
$ node decrypt.js <encrypted_string> <password>
```

#### Example

```bash
$ node decrypt.js "960554fa328ba523edc73123fc84868c:209df78d93c5e82f3474cdca:f401b6c43247d4a0806a6433e10de461:561748277a7e56ebea6ef2" "my_password"

> Hello World
```
