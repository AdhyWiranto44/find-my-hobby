import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import RoleRepository from '../repositories/role_repository';
import RoleInterface from '../interfaces/role_interface';


export default class RoleService {

  constructor() {}

  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const roles = await new RoleRepository().getAll(filter, limit, skip);

    if (roles.length < 1) throw createError(StatusCodes.NOT_FOUND, "Roles empty.");

    return roles;
  }

  async getOne(slug: string = "") {
    const role = await new RoleRepository().getOne(slug);

    if (role == null) throw createError(StatusCodes.NOT_FOUND, "Role not found.");

    return role;
  }

  async create(newRole: RoleInterface) {
    if (Object.keys(newRole).length === 0) {
      throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");
    }

    newRole["slug"] = newRole.name.replace(/\s+/g, '-').toLowerCase();
    const role = await new RoleRepository().insertOne(newRole);

    return role;
  }

  async update(updateRole: RoleInterface, slug: string) {
    if (Object.keys(updateRole).length === 0) {
      throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");
    }

    const role = await new RoleRepository().update(slug, updateRole);
    if (role == null) throw createError(StatusCodes.BAD_REQUEST, "Role not found.");

    return role;
  }

  async delete(slug: string) {
    const role = await new RoleRepository().remove(slug);

    return role;
  }
}