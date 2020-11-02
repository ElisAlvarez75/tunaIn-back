const passwordHash = require('password-hash');
const { adminEmail, adminPassword } = require("../config");

const initFirstUser = (User) => {
  User.countDocuments()
    .then((count) => {
      if (count === 0) {
        console.log('No users found, going to create first user')

        const data = {
          email: adminEmail,
          password: passwordHash.generate(adminPassword),
          nombre: "Admin",
          username: "admin",
          fechaNacimiento: new Date(),
        }
        const admin = new User(data);
        admin.save();
      }
    })
}

module.exports = {
  initFirstUser,
}
