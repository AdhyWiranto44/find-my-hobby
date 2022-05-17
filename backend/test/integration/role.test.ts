import request from "supertest";
import { StatusCodes } from 'http-status-codes';
import { app, server } from '../../app';
import Connection from "../../src/database/Connection";
import User from "../../src/models/User";
import Hobby from "../../src/models/Hobby";
import Suggestion from "../../src/models/Suggestion";
import Role from "../../src/models/Role";
import { default_roles, default_hobbies, default_suggestions, default_users, default_categories } from "../../src/helpers/dummy_data";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import { Category } from "../../src/models/Category";

const API_PREFIX = "/api/v1";
let JWT = "";
let conn: Connection;

beforeAll( async () => {
  conn = new Connection();
  await conn.dropDatabase();
  
  await User.insertMany(default_users);
  await Role.insertMany(default_roles);
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

describe("GET /api/v1/roles", () => {
  
  it("get all roles data from local database", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/roles`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all roles data with pagination", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/roles?limit=10&skip=0`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("GET /api/v1/roles/:slug", () => {

  it ("get specific role by slug", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/roles/moderator`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get specific role by slug and data not found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/roles/lkasdlkn`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});


describe("POST /api/v1/roles", () => {

  it ("create new role", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/roles`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Member",
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create empty role", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/roles`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new role and token not provided", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/roles`)
      .send({
        "name": "Member",
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("PATCH /api/v1/roles/:slug", () => {

  it ("update specific role by slug", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/roles/moderator`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Moderator New"
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific role by slug and data not found", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/roles/kasndlknasioiwe`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Moderator New"
      })
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific role by slug with empty update data", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/roles/kasndlknasioiwe`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific role by slug and token not provided", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/roles/moderator`)
      .send({
        "name": "Moderator New"
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("DELETE /api/v1/roles/:slug", () => {

  it ("delete specific role by slug", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/roles/moderator`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by slug and token not provided", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/roles/moderator`)
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