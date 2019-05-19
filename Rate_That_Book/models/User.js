const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,  email: String,
  password: String,
 });
const User = mongoose.model('User', UserSchema);
module.exports = User;

/*
 we have used the bcrypt library, which uses a genSalt mechanism to convert 
 a password into an encrypted string. 

  The  method—createUser—in the User model takes the user object, 
  converts the user-provided password into a bcrypted password, and then 
  saves it to the database.


*/
module.exports.createUser = (newUser, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (error, hash) => {
         // store the hashed password      
      const newUserResource = newUser;
      newUserResource.password = hash;
      newUserResource.save(callback);
    });  
  });
};

module.exports.getUserByEmail = (email, callback) => {
  const query = { email };
  User.findOne(query, callback);
};
module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};