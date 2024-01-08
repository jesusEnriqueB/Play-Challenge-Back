const request = require("supertest");
const app = require("./../app");

const testUser = {
  email: "testemail@mail.com",
  password: "Password1234",
  fullName: "test name",
};

describe("loginUser", () => {
  let server;

  beforeAll(async () => {
    server = await app.listen(0, () => {
      console.log("Server is running on a random port");
    });

    await request(server).post("/api/users").send({
      email: testUser.email,
      password: testUser.password,
      fullName: testUser.fullName,
    });
  });

  afterAll(async () => {
    await request(server).delete(`/api/users?email=${testUser.email}`);
    await server.close();
  });

  // Returns a 200 status code and a serialized user object with a token when valid email and password are provided
  it("should return a 200 status code and a serialized user object with a token when valid email and password are provided", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "testemail@mail.com",
      password: "Password1234",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("token");
    expect(response.body.email).toBe(testUser.email);
    expect(response.body.fullName).toBe(testUser.fullName);
  });

  it("should return a 401 status code when password is not correct", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "testemail@mail.com",
      password: "PassworWrong",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Error: Invalid password");
  });

  it("should return a 401 status code when user not exist, invalid email", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "invalidemail@mail.com",
      password: "Password1234",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "error",
      "Error: Invalid email or password"
    );
  });

  it("should return a 400 status code when not pass all fields", async () => {
    const response = await request(server).post("/api/auth/login").send({
      password: "Password1234",
    });

    expect(response.status).toBe(400);
  });

  it("should return a 400 status code when not pass a email", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "thisisnotanemail",
      password: "Password1234",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Must be a valid email");
  });

  it("should return a 400 status code when pass a empty string", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toBe("Must be a valid email");
    expect(response.body.errors[1].msg).toBe(
      "Password must be at least 6 character"
    );
  });

  it("should return a 400 status code when pass a password with 5 characters", async () => {
    const response = await request(server).post("/api/auth/login").send({
      email: "testemail@mail.com",
      password: "12345",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe(
      "Password must be at least 6 character"
    );
  });
});
