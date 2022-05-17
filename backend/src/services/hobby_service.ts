import HobbyRepository from "../repositories/hobby_repository";
import CategoryRepository from "../repositories/category_repository";
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import HobbyInterface from "../interfaces/hobby_interface";


export default class HobbyService {

  constructor() {}

  async getAll(filter: any = {}, limit: number = 1, skip: number = 0) {
    const hobbies = await new HobbyRepository().getAll(filter, limit, skip);

    if (hobbies.length < 1) throw createError(StatusCodes.NOT_FOUND, "Hobbies empty.");

    return hobbies;
  }

  async getByCategory(category: string, limit: number = 1, skip: number = 0) {
    const filter = { "category": category }
    const hobbies = await new HobbyRepository().getAll(filter, limit, skip);

    if (hobbies.length < 1) throw createError(StatusCodes.NOT_FOUND, "Hobbies not found.");

    return hobbies;
  }

  async getOne(slug: string = "") {
    let hobby = await new HobbyRepository().getOne(slug);

    if (hobby == null) throw createError(StatusCodes.NOT_FOUND, "Hobby not found.");

    const update: any = { visited_count: hobby.visited_count + 1 };
    hobby = await new HobbyRepository().update(hobby.slug, update);

    return hobby;
  }

  async create(newHobby: HobbyInterface) {
    newHobby["slug"] = newHobby.name.replace(/\s+/g, '-').toLowerCase();

    const category = await new CategoryRepository().getOne(newHobby.category);
    if (category == null) throw createError(StatusCodes.BAD_REQUEST, "Category not found.");

    const hobby = await new HobbyRepository().insertOne(newHobby);

    return hobby;
  }

  async update(updateHobby: HobbyInterface, slug: string) {
    const hobby = await new HobbyRepository().update(slug, updateHobby);
    if (hobby == null) throw createError(StatusCodes.BAD_REQUEST, "Hobby not found.");

    return hobby;
  }

  async delete(slug: string) {
    const hobby = await new HobbyRepository().remove(slug);

    if (hobby == null) throw createError(StatusCodes.BAD_REQUEST, "Hobby not found.");

    return hobby;
  }
}