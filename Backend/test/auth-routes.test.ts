import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";
import sinon from "sinon";
import authService from "../src/5-services/auth-service";

describe("Testing auth routes", () => {

  //  LOGIN
  // checking token
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
    expect(response.status).to.equal(201);
  });

  // checking missing credentials
  it("should return an error for missing credentials", async () => {
    const credentials = {}; 
    const response = await supertest(app.server)
      .post("/api/auth/login")
      .send(credentials);
  
    expect(response.status).to.equal(400);
  });

  // checking invalid credentials
  it("should return an error for invalid credentials", async () => {
    const credentials = {
      email: "dvadermail.com",
      password: "12345"
    }; 
    const response = await supertest(app.server)
      .post("/api/auth/login")
      .send(credentials);
  
    expect(response.status).to.equal(400);
  });

  // REGISTER
  // checking token
  it("should return token upon registration", async () => {
    const user = {
      userId: 0,
      firstName: "Tom",
      lastName: "Ford",
      password: "12345",
      email: "example@mail.com",
      roleId: 1
    };

    // create a stub for authService.register method so we won't actuially register a new user every time
    const authServiceStub = sinon.stub(authService, "register");

    // specify the desired behavior of the stub
    authServiceStub.resolves("dummyToken");

    const response = await supertest(app.server)
      .post("/api/auth/register")
      .send(user);

    const token = response.body;
    expect(authServiceStub.calledOnce).to.be.true; // verify the method is called
    expect(token).to.be.a("string");
    expect(response.status).to.equal(201);
    
    // restore the original method
    authServiceStub.restore();
  });

  // checking missing user data
  it("should return an error for missing user data", async () => {
    const user = {}; // testing missing credentials
    const response = await supertest(app.server)
      .post("/api/auth/register")
      .send(user);
  
    expect(response.status).to.equal(400);
  });

  // checking email duplication
  it("should return an error duplicating an email", async () => {
    const user = {
      userId: "11",
      firstName: "Tom",
      lastName: "Ford",
      email: "dvader@mail.com",
      password: "12345",
      roleId: "0"
    };// testing invalid credentials
    const response = await supertest(app.server)
      .post("/api/auth/register")
      .send(user);
  
    expect(response.status).to.equal(400);
  });
});