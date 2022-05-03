import { assert } from "console";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app, myConnection, server} from '../../app';

const API_PREFIX = "/api/v1";


describe("POST /api/v1/login", () => {
  it("create JSON Web Token to authentication", (done) => {
    request(app)
      .post(`${API_PREFIX}/login`)
      .send({ "username": "admin", "password": "12345" })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});

afterAll(() => {
  myConnection.closeConnection();
  server.close();
});