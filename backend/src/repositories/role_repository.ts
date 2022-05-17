import DatabaseHelper from "../database/DatabaseHelper";
import RoleInterface from "../interfaces/role_interface";
import Role from "../models/Role";


export default class RoleRepository {

  connection: any = null;

  constructor() {
    this.connection = DatabaseHelper.getConnection();
  }
  
  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const roles = await Role.find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ created_at: -1 })
    .exec();

    return roles;
  }

  async getOne(slug: any) {
    const role = Role.findOne({ slug }).exec();

    return role;
  }

  async insertOne(role: RoleInterface) {
    const created = await new Role(role).save();

    return created;
  }

  async update(slug: string, role: RoleInterface) {
    const updated = Role.findOneAndUpdate({slug}, role, { runValidators: true });

    return updated;
  }

  async remove(slug: string) {
    const removed = Role.findOneAndRemove({slug});

    return removed;
  }

}