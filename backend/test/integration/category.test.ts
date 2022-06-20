import request from "supertest";
import { StatusCodes } from 'http-status-codes';
import { app, server } from '../../app';
import ConnectionPostgres from "../../src/database/ConnectionPostgres";
import User from "../../src/models/User";
import Hobby from "../../src/models/Hobby";
import Suggestion from "../../src/models/Suggestion";
import { Category } from "../../src/models/Category";
import { default_categories, default_hobbies, default_suggestions, default_users } from "../../src/helpers/dummy_data";
import { randomBytes } from "crypto";
import { sign } from "jsonwebtoken";

const API_PREFIX = "/api/v1";
let JWT = "";
let conn: ConnectionPostgres;

beforeAll( async () => {
  conn = new ConnectionPostgres();
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

describe("GET /api/v1/categories", () => {
  
  it("get all categories data from local database", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/categories`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all categories data with pagination", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/categories?limit=10&skip=0`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("GET /api/v1/categories/:slug", () => {

  it ("get specific category by slug", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/categories/audio-visual`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get specific category by slug and data not found", (done: any) => {
    request(app)
      .get(`${API_PREFIX}/categories/lkasdlkn`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});


describe("POST /api/v1/categories", () => {

  it ("create new category", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/categories`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Kategori Baru",
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create empty category", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/categories`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new category and token not provided", (done: any) => {
    request(app)
      .post(`${API_PREFIX}/categories`)
      .send({
        "name": "Kategori Baru",
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("PATCH /api/v1/categories/:slug", () => {

  it ("update specific category by slug", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/categories/kategori-baru`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Kategori Anyar"
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific category by slug and data not found", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/categories/kasndlknasioiwe`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({
        "name": "Kategori Baru Banget"
      })
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific category by slug with empty update data", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/categories/kasndlknasioiwe`)
      .set("Authorization", `Bearer ${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific category by slug and token not provided", (done: any) => {
    request(app)
      .patch(`${API_PREFIX}/categories/kategori-baru`)
      .send({
        "name": "Kategori Anyar"
      })
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("DELETE /api/v1/categories/:slug", () => {

  it ("delete specific category by slug", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/categories/kategori-baru`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by slug and token not provided", (done: any) => {
    request(app)
      .delete(`${API_PREFIX}/categories/kategori-baru`)
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

afterAll(() => {
  conn.closeConnectionPostgres();
  server.close();
});