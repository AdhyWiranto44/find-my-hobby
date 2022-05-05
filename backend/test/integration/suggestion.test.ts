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

describe("GET /api/v1/suggestions", () => {
  
  it("get all suggestions data from local database", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/suggestions`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all suggestions data from local database and token not provided", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/suggestions`)
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("GET /api/v1/suggestions/:slug", () => {

  it ("get specific suggestion by slug", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/suggestions/mendayung-perahu`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get specific suggestion by slug and data not found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/suggestions/lkasdlkn`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("get specific suggestion by slug and token not provided", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/suggestions/berlayar`)
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("GET /api/v1/suggestions/categories/:slug", () => {

  it ("get suggestions by category", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/suggestions/categories/teknologi`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get suggestions by category and data not found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/suggestions/categories/asndlkans`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("get suggestions by category and token not provided", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/suggestions/categories/teknologi`)
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});


describe("POST /api/v1/suggestions", () => {

  it ("create new suggestion", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/suggestions`)
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

  it ("create new suggestion and category not found", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/suggestions`)
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

  it ("create empty suggestion", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/suggestions`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new suggestion and token not provided", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/suggestions`)
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

describe("PATCH /api/v1/suggestions/:slug", () => {

  it ("update specific suggestion by slug", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/suggestions/mengodonf`)
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

  it ("update specific suggestion by slug and data not found", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/suggestions/kasndlknasioiwe`)
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

  it ("update specific suggestion by slug with empty update data", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/suggestions/kasndlknasioiwe`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific suggestion by slug and token not provided", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/suggestions/mengodonf`)
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

describe("DELETE /api/v1/suggestions/:slug", () => {

  it ("delete specific suggestion by slug", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/suggestions/mengodonf`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific suggestion by slug and suggestion not found", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/suggestions/mengodonf`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific suggestion by slug and token not provided", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/suggestions/mengodonf`)
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