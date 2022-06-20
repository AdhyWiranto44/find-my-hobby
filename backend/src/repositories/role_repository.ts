import ConnectionPostgres from "../database/ConnectionPostgres";
import DatabaseHelper from "../database/DatabaseHelper";
import RoleInterface from "../interfaces/role_interface";
import Role from "../../models/Role";
import { DataTypes, Op } from "sequelize";


export default class RoleRepository {

  connection: any = null;

  constructor() {
    this.connection = ConnectionPostgres.connect();
  }
  
  async getAll(filter: any = {}, limit: number = 1, skip: number = 0) {
    const roles = await Role(this.connection, DataTypes)
    .findAll({
      where: {
        ...filter,
        name: {
          [Op.like]: filter.name !== undefined ? `${filter.name}%` : `%`
        }
      }, limit: limit, offset: skip,
      order: [['createdAt', 'DESC']]
    });

    return roles;
  }

  async getOne(slug: any) {
    const role = await Role(this.connection, DataTypes)
    .findOne({
      where: {slug}
    });

    return role;
  }

  async insertOne(role: RoleInterface) {
    await Role(this.connection, DataTypes)
    .create(
      {...role, createdAt: new Date(), updatedAt: new Date()}
    );

    const created = await Role(this.connection, DataTypes)
      .findOne(
        {where: {slug: role.slug}}
      );

    return created;
  }

  async update(slug: string, role: RoleInterface) {
    await Role(this.connection, DataTypes)
      .update(
        {...role, updatedAt: new Date()}, 
        {where: {slug: slug}
      });

    const updated = await Role(this.connection, DataTypes)
      .findOne(
        {where: {slug}}
      );

    return updated;
  }

  async remove(slug: string) {
    const removed = await Role(this.connection, DataTypes)
    .findOne(
      {where: {slug}}
    );

    await Role(this.connection, DataTypes)
      .destroy({
        where: {slug}
      });

    return removed;
  }

}