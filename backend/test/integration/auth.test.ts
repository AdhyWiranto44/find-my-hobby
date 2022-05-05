import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app, server} from '../../app';
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


describe("POST /api/v1/login", () => {
  it("create JSON Web Token to authentication", (done: any) => {
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
  conn.closeConnection();
  server.close();
});