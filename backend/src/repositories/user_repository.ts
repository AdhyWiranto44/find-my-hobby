import ConnectionPostgres from "../database/ConnectionPostgres";
import DatabaseHelper from "../database/DatabaseHelper";
import UserInterface from "../interfaces/user_interface";
import User from "../../models/User";
import { DataTypes, Op } from "sequelize";

class UserRepository {

  connection: any = null;

  constructor() {
    this.connection = ConnectionPostgres.connect();
  }

  async getAll(filter: any = {}, limit: number = 1, skip: number = 0) {
    const users = User(this.connection, DataTypes)
    .findAll({
      where: {
        ...filter,
        name: {
          [Op.like]: filter.username !== undefined ? `${filter.username}%` : `%`
        }
      }, limit: limit, offset: skip,
      order: [['createdAt', 'DESC']]
    });

    return users;
  }

  async getOne(username: string) {
    const user = User(this.connection, DataTypes)
    .findOne({
      where: {username}
    });

    return user;
  }

  async insertOne(user: UserInterface) {
    User(this.connection, DataTypes)
      .create(
        {...user, createdAt: new Date(), updatedAt: new Date()}
      );

    const created = User(this.connection, DataTypes)
      .findOne(
        {where: {slug: user.username}}
      );

    return created;
  }

  async update(username: string, user: UserInterface) {
    User(this.connection, DataTypes)
      .update(
        {...user, updatedAt: new Date()}, 
        {where: {username: username}
      });

    const updated = User(this.connection, DataTypes)
      .findOne(
        {where: {username}}
      );

    return updated;
  }

  async remove(username: string) {
    const removed = User(this.connection, DataTypes)
    .findOne(
      {where: {username}}
    );

    User(this.connection, DataTypes)
      .destroy({
        where: {username}
      });

    return removed;
  }

}


export default UserRepository;