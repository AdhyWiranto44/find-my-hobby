import { hashSync } from "bcrypt"; const ROUNDS = 12;
import UserRepository from "../repositories/user_repository";


export default class UserService {

  constructor() {}

  async getAll() {
    const users = await new UserRepository().getAll();

    if (users.length < 1) throw new Error("Users empty.");

    return users;
  }

  async getOne(username: string = "") {
    const user = await new UserRepository().getOne(username);

    if (user == null) throw new Error("User not found.");

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
    let password = req.body.password;
    if (password) { password = hashSync(password, ROUNDS) }
    
    const user = await new UserRepository().update(username, req.body);

    if (user == null) throw new Error("User not found.");

    return user;
  }

  async delete(username: string) {
    const user = await new UserRepository().remove(username);

    if (user == null) throw new Error("User not found.");

    return user;
  }
}