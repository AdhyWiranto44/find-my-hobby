import request from "supertest";
import { StatusCodes} from 'http-status-codes';
import { app, server, myConnection } from '../../app';

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

describe("GET /api/v1/hobbies", () => {
  
  it("get all hobbies data from local database", (done) => {
    request(app)
      .get(`${API_PREFIX}/hobbies`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all hobbies with filter and data found", (done) => {
    request(app)
      .get(`${API_PREFIX}/hobbies?name=Central`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all hobbies with filter and data not found", (done) => {
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

  it ("get specific hobby by slug", (done) => {
    request(app)
      .get(`${API_PREFIX}/hobbies/regional-optimization-liaison`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get specific hobby by slug and data not found", (done) => {
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

  it ("get hobbies by category", (done) => {
    request(app)
      .get(`${API_PREFIX}/hobbies/categories/teknologi`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get hobbies by category and data not found", (done) => {
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

  it ("create new hobby", (done) => {
    request(app)
      .post(`${API_PREFIX}/hobbies?token=${JWT}`)
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

  it ("create new hobby and category not found", (done) => {
    request(app)
      .post(`${API_PREFIX}/hobbies?token=${JWT}`)
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

  it ("create empty hobby", (done) => {
    request(app)
      .post(`${API_PREFIX}/hobbies?token=${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("create new hobby and token not provided", (done) => {
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

  it ("update specific hobby by slug", (done) => {
    request(app)
      .patch(`${API_PREFIX}/hobbies/mengodonf?token=${JWT}`)
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

  it ("update specific hobby by slug and data not found", (done) => {
    request(app)
      .patch(`${API_PREFIX}/hobbies/kasndlknasioiwe?token=${JWT}`)
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

  it ("update specific hobby by slug with empty update data", (done) => {
    request(app)
      .patch(`${API_PREFIX}/hobbies/kasndlknasioiwe?token=${JWT}`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("update specific hobby by slug and token not provided", (done) => {
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

  it ("delete specific hobby by slug", (done) => {
    request(app)
      .delete(`${API_PREFIX}/hobbies/mengodonf?token=${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by slug and hobby not found", (done) => {
    request(app)
      .delete(`${API_PREFIX}/hobbies/mengodonf?token=${JWT}`)
      .expect(StatusCodes.BAD_REQUEST)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by slug and token not provided", (done) => {
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
  myConnection.closeConnection();
  server.close();
});