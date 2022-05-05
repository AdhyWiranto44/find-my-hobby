import request from "supertest";
import { StatusCodes} from 'http-status-codes';
import { app, server } from '../../app';
import Connection from "../../src/database/Connection";
import User from "../../src/models/User";
import { 
  default_categories, 
  default_hobbies, 
  default_suggestions, 
  default_users 
} from "../../src/helpers/dummy_data";
import { Category } from "../../src/models/Category";
import Hobby from "../../src/models/Hobby";
import Suggestion from "../../src/models/Suggestion";
import { disconnect } from "mongoose";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";

const API_PREFIX = "/api/v1";
let JWT = "";
let conn: Connection;

beforeAll( async () => {
  conn = new Connection();
  await conn.dropDatabase();
  
  await User.insertMany(default_users);
  await Category.insertMany(default_categories);
  await Hobby.insertMany(default_hobbies);
  await Suggestion.insertMany(default_suggestions);
});

// Create JWT
beforeAll(() => {
  const payload = {
    "uid": randomBytes(16).toString('hex'),
    "username": "admin",
  }
  JWT = sign(payload, process.env.SECRET as string, { expiresIn: process.env.TOKEN_EXPIRES_IN as string });
});

describe("GET /api/v1/users", () => {
  
  it("get all users data from local database", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/users`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all users data from local database and token not provided.", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/users`)
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("GET /api/v1/users/:username", () => {

  it ("get specific user by username", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/users/admin`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("get specific user by username and jwt not provided", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/users/admin`)
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get specific user by username and data not found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/users/lkasdlkn`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});


describe("POST /api/v1/users", () => {

  it ("create new user", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/users`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "username": "admin2",
        "password": "12345"
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new user that already exists", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/users`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "username": "admin",
        "password": "12345"
      })
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create empty user", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/users`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new user and token not provided", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/users`)
      .send({
        "username": "admin2",
        "password": "12345"
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("PATCH /api/v1/users/:username", () => {

  it ("update specific user by username", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/users/admin2`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "password": "admin2"
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific user by username and data not found", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/users/panspdinplasndl`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "password": "admin2"
      })
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific user by username with empty update data", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/users/admin`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific user by username and token not provided", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/users/admin2`)
      .send({
        "password": "admin2"
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("DELETE /api/v1/users/:username", () => {

  it ("delete specific user by username", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/users/admin2`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by username and token not provided", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/users/admin2`)
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

afterAll(() => {
  conn.closeConnection();
  server.close();
});