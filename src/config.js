const jwtSecret = process.env.JWT_SECRET  /* prod */ || 'meow'; /* dev */
const adminPassword = process.env.ADMIN_PASSWORD /* prod */ || 'meow'; /* dev */
const adminEmail = process.env.ADMIN_EMAIL  /* prod */ || 'admin@admin.com'; /* dev */

module.exports = {
  jwtSecret,
  adminPassword,
  adminEmail,
}
