import { registerUserService } from "../services/auth.service";
import supertest from "supertest";
import app from "../index";

describe("auth", () => {
  describe("register user route", () => {
    describe("given incomplete user details", () => {
      it("should return a 400", () => {
        expect(true).toBe(true);
      });
    });
  });
  describe("check test structure when integrating with supertest", () => {
    describe("when not having the testProperty", () => {
      const testProperty = 1;
      it("should return a 400", async () => {
        const response = await supertest(app).post("/api/v1/auth/test");
        expect(response.status).toBe(400);
        // await supertest(app).post("/api/v1/auth/test").expect(400);
      });
    });
  });
});
