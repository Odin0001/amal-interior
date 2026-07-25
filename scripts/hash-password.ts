import bcrypt from 'bcryptjs'

const password = process.argv[2]

if (!password) {
  console.error('Usage: npm run admin:hash-password -- "your-password"')
  process.exit(1)
}

bcrypt.hash(password, 12).then((hash) => {
  // Base64-encoded: a raw bcrypt hash is full of literal "$" characters,
  // which this project's env loader treats as variable-expansion syntax
  // (it silently replaces $2b, $12, etc. with '' since it allows var names
  // to start with digits) — base64 has no "$" so it survives untouched.
  console.log(Buffer.from(hash, 'utf8').toString('base64'))
})
