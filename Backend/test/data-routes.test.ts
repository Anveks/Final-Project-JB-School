import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";
import { expect } from "chai";
import sinon from "sinon";
import dataService from "../src/5-services/data-service";
import VacationModel from "../src/2-models/vacation-model";

const infiniteUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6OSwiZmlyc3ROYW1lIjoiQW5uYSIsImxhc3ROYW1lIjoiVmVrc2VsbWFuIiwiZW1haWwiOiJhbnZla3NAbWFpbC5jb20iLCJyb2xlSWQiOjJ9LCJpYXQiOjE2ODUyNjUyMzB9.DSPgu3hLJ_16mP38iU0cZtusSJaEMDr1K0qV2LKWxRU";

const infiniteAdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6NSwiZmlyc3ROYW1lIjoiRGFydGgiLCJsYXN0TmFtZSI6IlZhZGVyIiwiZW1haWwiOiJkdmFkZXJAbWFpbC5jb20iLCJyb2xlSWQiOjF9LCJpYXQiOjE2ODUyNjUzMTZ9.s-LruTZrESQaOFISwlPEkDjc2mdNOQ1zNPJtZXApO-Y";

describe("Testing data-routes.ts", () => {

  // route not found
  it("should return route not found err", async () => {
    const response = await supertest(app.server)
      .get("/api/abc");
    
    expect(response.status).to.equal(404);
    });


  // GET all vacations:
  it("should return a validation error with absent token", async () => {
  const response = await supertest(app.server)
    .get("/api/vacations");
  
  expect(response.status).to.equal(401);
  });

  it("should return a validation err", async () => {
    const response = await supertest(app.server)
      .get("/api/vacations")
      .set("Authorization", `Bearer ${infiniteUserToken.slice(2, 6)}`); // Set an invalid token

    expect(response.status).to.equal(401);
  });

  it("should return vacations array when a valid token is provided", async () => {
    const response = await supertest(app.server)
      .get("/api/vacations")
      .set("Authorization", `Bearer ${infiniteUserToken}`);
  
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body.length).to.be.greaterThanOrEqual(0);
  });

  // GET one vacation:
  it("should return a one vacation", async () => {
    const response = await supertest(app.server)
      .get("/api/vacations/1")
      .set("Authorization", `Bearer ${infiniteAdminToken}`);
    
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("application/json"); // chekign if json
    });

  it("should return a validation error with unauthorized err", async () => {
    const response = await supertest(app.server)
      .get("/api/vacations/1")
      .set("Authorization", `Bearer ${infiniteUserToken}`);
    
    expect(response.status).to.equal(401);
    });

    // POST route 

    it("should add a new vacation and return status 201", async () => {
      const newVacation = {
        destination: "Hawaii",
        description: "A beautiful island paradise",
        startDate: "2023-06-01",
        endDate: "2023-06-10",
        price: 2000,
        imageUrl: "https://example.com/image.jpg"
      };

      const dataServiceStub = sinon.stub(dataService, "addVacation")
  
      const response = await supertest(app.server)
        .post("/api/vacations/")
        .set("Authorization", `Bearer ${infiniteAdminToken}`)
        .set("Content-Type", "application/json")
        .send(JSON.stringify(newVacation));

      expect(response.status).to.equal(201);
      dataServiceStub.restore();
    });

    it("should retrun an authorization error", async () => {
      const newVacation = {
        destination: "Hawaii",
        description: "A beautiful island paradise",
        startDate: "2023-06-01",
        endDate: "2023-06-10",
        price: 2000,
        imageUrl: "https://example.com/image.jpg"
      };

      const dataServiceStub = sinon.stub(dataService, "addVacation")
  
      const response = await supertest(app.server)
        .post("/api/vacations/")
        .set("Authorization", `Bearer ${infiniteUserToken}`)
        .set("Content-Type", "application/json")
        .send(JSON.stringify(newVacation));

      expect(response.status).to.equal(401);
      dataServiceStub.restore();
    });

    // PUT 
    it("should update a vacation and return status 201", async () => {
      const newVacation = {
        description: "Come to Sin City, where you can lose all your money, drink too much, and get married to a stranger all in one night!",
        destination: "Vegas, USA",
        startDate: "2023-06-10T21:00:00.000Z",
        imageUrl: "http://localhost:4000/api/vacations/images/f8c5eedb-3655-42ba-a6e2-5ada083ee262.jpg",
        endDate: "2023-06-29T21:00:00.000Z",
        price: 240,
        vacationId: 1
      };

      const dataServiceStub = sinon.stub(dataService, "updateVacation")
  
      const response = await supertest(app.server)
        .put("/api/vacations/1")
        .set("Authorization", `Bearer ${infiniteAdminToken}`)
        .send(newVacation);

      expect(response.status).to.equal(200);
      dataServiceStub.restore();
    });

    it("should return unathorized err", async () => {
      const newVacation = {
        description: "Come to Sin City, where you can lose all your money, drink too much, and get married to a stranger all in one night!",
        destination: "Vegas, USA",
        startDate: "2023-06-10T21:00:00.000Z",
        imageUrl: "http://localhost:4000/api/vacations/images/f8c5eedb-3655-42ba-a6e2-5ada083ee262.jpg",
        endDate: "2023-06-29T21:00:00.000Z",
        price: 240,
        vacationId: 1
      };

      const dataServiceStub = sinon.stub(dataService, "updateVacation")
  
      const response = await supertest(app.server)
        .put("/api/vacations/1")
        .set("Authorization", `Bearer ${infiniteUserToken}`)
        .send(newVacation);

      expect(response.status).to.equal(401);
      dataServiceStub.restore();
    });
     
});