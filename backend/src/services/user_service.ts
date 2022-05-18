import { hashSync } from "bcrypt";
import UserRepository from "../repositories/user_repository";
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import UserInterface from "../interfaces/user_interface";
import { ROUNDS } from "../helpers/constants";


export default class UserService {

  constructor() {}

  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const users = await new UserRepository().getAll(filter, limit, skip);

    if (users.length < 1) throw createError(StatusCodes.NOT_FOUND, "Users empty.");

    return users;
  }

  async getOne(username: string = "") {
    const user = await new UserRepository().getOne(username);

    if (user == null) throw createError(StatusCodes.NOT_FOUND, "User not found.");

    return user;
  }

  async create(newUser: UserInterface) {
    if (Object.keys(newUser).length === 0) throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");

    newUser.password = hashSync(Buffer.from(newUser.password).toString(), ROUNDS)

    const userChecked = await new UserRepository().getOne(Buffer.from(newUser.username).toString());
    if (userChecked !== null) throw createError(StatusCodes.BAD_REQUEST, "User already exists.");
    const user = await new UserRepository().insertOne(newUser);

    return user;
  }

  async update(updateUser: UserInterface, username: string) {
    if (Object.keys(updateUser).length === 0) throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");

    if (updateUser.password && updateUser.password != "") {
      updateUser.password = hashSync(Buffer.from(updateUser.password).toString(), ROUNDS)
    }
    
    const user = await new UserRepository().update(username, updateUser);
    if (user == null) throw createError(StatusCodes.BAD_REQUEST, "User not found.");

    return user;
  }

  async delete(username: string) {
    const user = await new UserRepository().remove(username);
    if (user == null) throw createError(StatusCodes.BAD_REQUEST, "User not found.");

    return user;
  }
}