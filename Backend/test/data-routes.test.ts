import { describe, it } from "mocha";
import supertest from "supertest";
import app from "../src/app";
import { expect } from "chai";
import sinon from "sinon";

describe("Testing data-routes.ts", () => {

  it("should return a validation err", async () => {
    const response = await supertest(app.server)
      .get("/api/vacations")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTIsImZpcnN0TmFtZSI6Ikx1a2UiLCJsYXN0TmFtZSI6IlNreXdhbGtlciIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsInJvbGVJZCI6Mn0sImlhdCI6MTY4NTEwOTk0NSwiZXhwIjoxNjg1MTIwNzQ1fQ.FSnzuaWN0PpKPmaNVb3CXep0wtE7693kVgv6v2Nl9CA"); // Set an invalid token

    expect(response.status).to.equal(401);
  });

});