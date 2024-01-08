const request = require("supertest");
const app = require("./../app");

const userToCreate = {
  email: "userdemo@mail.com",
  password: "Password1234",
  fullName: "test name",
};

describe("createUser", () => {
  let server;

  beforeAll(async () => {
    server = await app.listen(10, () => {
      console.log("Server is running on a random port");
    });
  });

  afterAll(async () => {
    const response = await request(server).delete(
      `/api/users?email=${userToCreate.email}`
    );
    console.log(response.body);
    await server.close();
  });

  it("should return a 200 status code", async () => {
    const response = await request(server).post("/api/users").send({
      email: userToCreate.email,
      password: userToCreate.password,
      fullName: userToCreate.fullName,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toBe("userdemo@mail.com");
    expect(response.body.fullName).toBe("test name");
  });

  it("should return a 500 status code when email exist", async () => {
    const response = await request(server).post("/api/users").send({
      email: userToCreate.email,
      password: userToCreate.password,
      fullName: userToCreate.fullName,
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Error: User exist");
  });

  it("should return a 400 status code when not pass a field", async () => {
    const response = await request(server).post("/api/users").send({
      email: userToCreate.email,
      password: userToCreate.password,
    });

    expect(response.status).toBe(400);
  });

  it("should return a 400 status code when not pass a email", async () => {
    const response = await request(server).post("/api/users").send({
      email: "notemail",
      password: userToCreate.password,
      fullName: userToCreate.fullName,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Must be a valid email");
  });

  it("should return a 400 status code when pass a empty string", async () => {
    const response = await request(server).post("/api/users").send({
      email: "",
      password: "",
      fullName: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(3);
    expect(response.body.errors[0].msg).toBe("Must be a valid email");
    expect(response.body.errors[1].msg).toBe(
      "Password must be at least 6 character"
    );
  });
});
