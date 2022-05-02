import request from "supertest";
import { StatusCodes} from 'http-status-codes';
import app from '../../app';
import assert from "assert";

const API_PREFIX = "/api/v1";
let JWT = "";

// Create JWT
beforeAll(() => {
  const form: any = { "username": "admin", "password": "12345" }
  request(app).post(`${API_PREFIX}/login`).send(form).end((err, res) => {
      if (err) throw err;
      JWT = res.body.data.token;
    });
});

describe("GET /api/v1/categories", () => {
  
  it("get all categories data from local database", (done) => {
    request(app)
      .get(`${API_PREFIX}/categories`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("GET /api/v1/categories/:slug", () => {

  it ("get specific category by slug", (done) => {
    request(app)
      .get(`${API_PREFIX}/categories/audio-visual`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get specific category by slug and data not found", (done) => {
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

  it ("create new category", (done) => {
    request(app)
      .post(`${API_PREFIX}/categories?token=${JWT}`)
      .send({
        "name": "Kategori Baru",
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create empty category", (done) => {
    request(app)
      .post(`${API_PREFIX}/categories?token=${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new category and token not provided", (done) => {
    request(app)
      .post(`${API_PREFIX}/categories`)
      .send({
        "name": "Kategori Baru",
      })
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("PATCH /api/v1/categories/:slug", () => {

  it ("update specific category by slug", (done) => {
    request(app)
      .patch(`${API_PREFIX}/categories/kategori-baru?token=${JWT}`)
      .send({
        "name": "Kategori Anyar"
      })
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific category by slug and data not found", (done) => {
    request(app)
      .patch(`${API_PREFIX}/categories/kasndlknasioiwe?token=${JWT}`)
      .send({
        "name": "Kategori Baru Banget"
      })
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific category by slug with empty update data", (done) => {
    request(app)
      .patch(`${API_PREFIX}/categories/kasndlknasioiwe?token=${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific category by slug and jwt not provided", (done) => {
    request(app)
      .patch(`${API_PREFIX}/categories/kategori-baru`)
      .send({
        "name": "Kategori Anyar"
      })
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});

describe("DELETE /api/v1/categories/:slug", () => {

  it ("delete specific category by slug", (done) => {
    request(app)
      .delete(`${API_PREFIX}/categories/kategori-baru?token=${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by slug and jwt not provided", (done) => {
    request(app)
      .delete(`${API_PREFIX}/categories/kategori-baru`)
      .expect(StatusCodes.NOT_FOUND)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});