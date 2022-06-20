import ConnectionPostgres from "../database/ConnectionPostgres";
import HobbyInterface from "../interfaces/hobby_interface";
import Hobby from "../../models/Hobby";
import { DataTypes, Op } from "sequelize";

export default class HobbyRepository {

  connection: any = null;

  constructor() {
    this.connection = ConnectionPostgres.connect();
  }

  async getAll(filter: any = {}, limit: number = 1, skip: number = 0) {
    const hobbies = await Hobby(this.connection, DataTypes)
    .findAll({
      where: {
        ...filter,
        name: {
          [Op.like]: filter.name !== undefined ? `${filter.name}%` : `%`
        }
      }, limit: limit, offset: skip,
      order: [['createdAt', 'DESC']]
    });

    return hobbies;
  }

  async getOne(slug: string = "") {
    const hobby = await Hobby(this.connection, DataTypes)
    .findOne({
      where: {slug}
    });

    return hobby;
  }

  async insertOne(hobby: HobbyInterface) {
    await Hobby(this.connection, DataTypes)
    .create(
      {...hobby, createdAt: new Date(), updatedAt: new Date()}
    );

    const created = await Hobby(this.connection, DataTypes)
      .findOne(
        {where: {slug: hobby.slug}}
      );

    return created;
  }

  async update(slug: string, hobby: HobbyInterface) {
    await Hobby(this.connection, DataTypes)
      .update(
        {...hobby, updatedAt: new Date()}, 
        {where: {slug: slug}
      });

    const updated = await Hobby(this.connection, DataTypes)
      .findOne(
        {where: {slug}}
      );

    return updated;
  }

  async remove(slug: string) {
    const removed = await Hobby(this.connection, DataTypes)
    .findOne(
      {where: {slug}}
    );

    await Hobby(this.connection, DataTypes)
      .destroy({
        where: {slug}
      });

    return removed;
  }
}