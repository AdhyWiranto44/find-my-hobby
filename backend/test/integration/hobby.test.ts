import request from "supertest";
import { StatusCodes } from 'http-status-codes';
import { app, server } from '../../app';
import Connection from "../../src/database/Connection";
import User from "../../src/models/User";
import Hobby from "../../src/models/Hobby";
import Suggestion from "../../src/models/Suggestion";
import { Category } from "../../src/models/Category";
import { default_categories, default_hobbies, default_suggestions, default_users } from "../../src/helpers/dummy_data";
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

describe("GET /api/v1/hobbies", () => {
  
  it("get all hobbies data from local database", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/hobbies`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all hobbies data with pagination", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/hobbies?limit=10&skip=0`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all hobbies with filter and data found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/hobbies?name=Central`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all hobbies with filter and data not found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/hobbies?name=asd`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("GET /api/v1/hobbies/:slug", () => {

  it ("get specific hobby by slug", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/hobbies/regional-optimization-liaison`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get specific hobby by slug and data not found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/hobbies/lkasdlkn`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("GET /api/v1/hobbies/categories/:slug", () => {

  it ("get hobbies by category", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/hobbies/categories/teknologi`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get hobbies by category and data not found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/hobbies/categories/asndlkans`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});


describe("POST /api/v1/hobbies", () => {

  it ("create new hobby", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/hobbies`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Mengodonf",
        "description": "Mengodonf.",
        "category": "teknologi",
        "img": "",
        "visited_count": 0
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new hobby and category not found", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/hobbies`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Mengodonf",
        "description": "Mengodonf.",
        "category": "teknologia",
        "img": "",
        "visited_count": 0
      })
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create empty hobby", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/hobbies`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new hobby and token not provided", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/hobbies`)
      .send({
        "name": "Mengodonf",
        "description": "Mengodonf.",
        "category": "teknologi",
        "img": "",
        "visited_count": 0
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("PATCH /api/v1/hobbies/:slug", () => {

  it ("update specific hobby by slug", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/hobbies/mengodonf`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Membuat Program Komputer",
        "category": "teknologi"
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific hobby by slug and data not found", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/hobbies/kasndlknasioiwe`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Membuat Program Komputer",
        "category": "teknologi"
      })
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific hobby by slug with empty update data", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/hobbies/kasndlknasioiwe`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific hobby by slug and token not provided", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/hobbies/mengodonf`)
      .send({
        "name": "Membuat Program Komputer",
        "category": "teknologi"
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("DELETE /api/v1/hobbies/:slug", () => {

  it ("delete specific hobby by slug", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/hobbies/mengodonf`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by slug and hobby not found", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/hobbies/mengodonf`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by slug and token not provided", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/hobbies/mengodonf`)
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