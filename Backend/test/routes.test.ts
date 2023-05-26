import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";

describe("Testing auth routes", () => {

  //  LOGIN
  it("should return token upon login", async () => {
    const credentials = {
      email: "dvader@mail.com",
      password: "12345"
    };
    const response = await supertest(app.server)
      .post("/api/auth/login")
      .send(credentials);

    const token = response.body;
    expect(token).to.be.a('string'); 
  });

  it("should return an error for missing credentials", async () => {
    const credentials = {}; // testing missing credentials
    const response = await supertest(app.server)
      .post("/api/auth/login")
      .send(credentials);
  
    expect(response.status).to.equal(400);
  });

  it("should return an error for invalid credentials", async () => {
    const credentials = {
      email: "dvadermail.com",
      password: "12345"
    }; // testing invalid credentials
    const response = await supertest(app.server)
      .post("/api/auth/login")
      .send(credentials);
  
    expect(response.status).to.equal(400);
  });

  // REGISTER
  it("should return token upon registration", async () => {
    const user = {
      userId: 0,
      firstName: "Tom",
      lastName: "Ford",
      password: "12345",
      email: "example@mail.com",
      roleId: 1
    };
    const response = await supertest(app.server)
      .post("/api/auth/register")
      .send(user);

    const token = response.body;
    expect(token).to.be.a('string'); 
  });

  it("should return an error for missing user data", async () => {
    const user = {}; // testing missing credentials
    const response = await supertest(app.server)
      .post("/api/auth/register")
      .send(user);
  
    expect(response.status).to.equal(500);
  });

  it("should return an error duplicating an email", async () => {
    const user = {
      userId: "",
      firstName: "Tom",
      lastName: "Ford",
      email: "dvader@mail.com",
      password: "12345",
      roleId: ""
    };// testing invalid credentials
    const response = await supertest(app.server)
      .post("/api/auth/register")
      .send(user);
  
    expect(response.status).to.equal(400);
  });


});