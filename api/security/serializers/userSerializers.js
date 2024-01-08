class UserCreated {
  constructor({ id, email, fullName, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

class UserLogged extends UserCreated {
  constructor({ id, email, fullName, createdAt, updatedAt, token }) {
    super({ id, email, fullName, createdAt, updatedAt });
    this.token = token;
  }
}

module.exports = {
  UserCreated,
  UserLogged,
};
