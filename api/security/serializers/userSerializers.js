class UserLogged {
  constructor({ id, email, fullName, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
module.exports = UserLogged;
