import { hashSync } from "bcrypt"; const ROUNDS = 12;
import UserRepository from "../repositories/user_repository";


export default class UserService {

  constructor() {}

  async getAll() {
    const users = await new UserRepository().getAll();

    return users;
  }

  async getOne(username: string = "") {
    const user = await new UserRepository().getOne(username);

    return user;
  }

  async create(req: any) {
    const newUser = {
      username: req.body.username,
      password: hashSync(req.body.password, ROUNDS),
      created_at: Date(),
      updated_at: Date()
    }

    const user = await new UserRepository().insertOne(newUser);

    return user;
  }

  async update(req: any, username: string) {
    const user = await new UserRepository().update(username, req.body);

    return user;
  }

  async delete(username: string) {
    const user = await new UserRepository().remove(username);

    return user;
  }
}