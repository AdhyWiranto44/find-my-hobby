import HobbyRepository from "../repositories/hobby_repository";
import CategoryRepository from "../repositories/category_repository";
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';


export default class HobbyService {

  constructor() {}

  async getAll(filter: any = {}) {
    const hobbies = await new HobbyRepository().getAll(filter);

    if (hobbies.length < 1) throw createError(StatusCodes.NOT_FOUND, "Hobbies empty.");

    return hobbies;
  }

  async getByCategory(category: string) {
    let hobbies = await new HobbyRepository().getAll();
    
    hobbies = hobbies.filter(hobby => {
      return hobby.category == category;
    });

    if (hobbies.length < 1) throw createError(StatusCodes.NOT_FOUND, "Hobbies not found.");

    return hobbies;
  }

  async getOne(slug: string = "") {
    let hobby = await new HobbyRepository().getOne(slug);

    if (hobby == null) throw createError(StatusCodes.NOT_FOUND, "Hobby not found.");

    const update = { visited_count: hobby.visited_count + 1 };
    hobby = await new HobbyRepository().update(hobby.slug, update);

    return hobby;
  }

  async create(req: any) {
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.category
    ) throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");

    const newHobby = {
      name: req.body.name,
      slug: req.body.name.replace(/\s+/g, '-').toLowerCase(),
      description: req.body.description,
      category: req.body.category,
      img: "",
      visited_count: 0
    }

    const category = await new CategoryRepository().getOne(newHobby.category);
    if (category == null) throw createError(StatusCodes.BAD_REQUEST, "Category not found.");

    const hobby = await new HobbyRepository().insertOne(newHobby);

    return hobby;
  }

  async update(req: any, slug: string) {
    const category = await new CategoryRepository().getOne(req.body.category);
    if (category == null) throw createError(StatusCodes.BAD_REQUEST, "Category not found.");

    const hobby = await new HobbyRepository().update(slug, req.body);

    if (hobby == null) throw createError(StatusCodes.BAD_REQUEST, "Hobby not found.");

    return hobby;
  }

  async delete(slug: string) {
    const hobby = await new HobbyRepository().remove(slug);

    if (hobby == null) throw createError(StatusCodes.BAD_REQUEST, "Hobby not found.");

    return hobby;
  }
}