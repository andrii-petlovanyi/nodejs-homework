/* eslint-disable no-undef */

import request from "supertest";
import { app } from "../src/app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const { MONGO_URL } = process.env;

const goodParams = { email: "a.pam@egetlac.co", password: "123321" };
const incorrectParams = { email: "a.pam@egetlac.com", password: "123321" };
const incorrectEmailFormat = { email: "a.pamegetlac.com", password: "123321" };
const incorrectPasswordFormat = {
  email: "a.pam@egetlac.co",
  password: "12",
};

describe("Test for SignIn controller", () => {
  let server;
  beforeAll(() => {
    mongoose
      .connect(MONGO_URL)
      .then(() => {
        server = app.listen(6006, () => {
          console.log("Testing server started successful");
        });
      })
      .catch(() => {
        process.exit(1);
      });
  });
  afterAll((done) => {
    mongoose.disconnect(done);
    server.close();
  });

  test("Standard SignIn with valid credentials params, and should be return token, user.subs and user.email", async () => {
    const {
      status,
      body: {
        data: { token, user },
      },
    } = await request(app)
      .get("/api/users/signin")
      .set("Content-type", "application/json")
      .send(goodParams);

    expect(status).toBe(200);
    expect(typeof token).toBe("string");
    expect(typeof user).toBe("object");
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });

  test("SignIn with incorrect user.email or user.password", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .get("/api/users/signin")
      .set("Content-type", "application/json")
      .send(incorrectParams);

    expect(status).toBe(401);
    expect(message).toBe("Email or password is wrong");
  });

  test("SignIn with incorrect format user.email", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .get("/api/users/signin")
      .set("Content-type", "application/json")
      .send(incorrectEmailFormat);

    expect(status).toBe(400);
    expect(message).toBe("Please enter a valid email address");
  });

  test("SignIn with incorrect format user.password", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .get("/api/users/signin")
      .set("Content-type", "application/json")
      .send(incorrectPasswordFormat);

    expect(status).toBe(400);
    expect(message).toBe("Password length must be at least 6 characters long");
  });

  test("SignIn without params", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .get("/api/users/signin")
      .set("Content-type", "application/json")
      .send();

    expect(status).toBe(400);
    expect(message).toBe("All fields is required");
  });

  test("SignIn without user.email", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .get("/api/users/signin")
      .set("Content-type", "application/json")
      .send({
        password: "123321",
      });

    expect(status).toBe(400);
    expect(message).toBe('"email" is required');
  });

  test("SignIn without user.password", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .get("/api/users/signin")
      .set("Content-type", "application/json")
      .send({
        email: "andrey.petlovany@gmail.com",
      });

    expect(status).toBe(400);
    expect(message).toBe('"password" is required');
  });
});
