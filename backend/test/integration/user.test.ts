import request from "supertest";
import { StatusCodes} from 'http-status-codes';
import { app, myConnection, server } from '../../app';

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

describe("GET /api/v1/users", () => {
  
  it("get all users data from local database", (done) => {
    request(app)
      .get(`${API_PREFIX}/users`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get all users data from local database and token not provided.", (done) => {
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

  it ("get specific user by username", (done) => {
    request(app)
      .get(`${API_PREFIX}/users/admin`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("get specific user by username and jwt not provided", (done) => {
    request(app)
      .get(`${API_PREFIX}/users/admin`)
      .expect(StatusCodes.UNAUTHORIZED)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it("get specific user by username and data not found", (done) => {
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

  it ("create new user", (done) => {
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

  it ("create new user that already exists", (done) => {
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

  it ("create empty user", (done) => {
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

  it ("create new user and token not provided", (done) => {
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

  it ("update specific user by username", (done) => {
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

  it ("update specific user by username and data not found", (done) => {
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

  it ("update specific user by username with empty update data", (done) => {
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

  it ("update specific user by username and token not provided", (done) => {
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

  it ("delete specific user by username", (done) => {
    request(app)
      .delete(`${API_PREFIX}/users/admin2`)
      .set("Authorization", `Bearer ${JWT}`)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it ("delete specific hobby by username and token not provided", (done) => {
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
  myConnection.closeConnection();
  server.close();
});