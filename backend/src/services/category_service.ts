import CategoryRepository from "../repositories/category_repository";
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import CategoryInterface from "../interfaces/category_interface";


export default class CategoryService {

  constructor() {}

  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const categories = await new CategoryRepository().getAll(filter, limit, skip);

    if (categories.length < 1) throw createError(StatusCodes.NOT_FOUND, "Categories empty.");

    return categories;
  }

  async getOne(slug: string = "") {
    const category = await new CategoryRepository().getOne(slug);

    if (category == null) throw createError(StatusCodes.NOT_FOUND, "Category not found.");

    return category;
  }

  async create(newCategory: CategoryInterface) {
    if (Object.keys(newCategory).length === 0) {
      throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");
    }

    newCategory["slug"] = newCategory.name.replace(/\s+/g, '-').toLowerCase();
    const category = await new CategoryRepository().insertOne(newCategory);

    return category;
  }

  async update(updateCategory: CategoryInterface, slug: string) {
    if (Object.keys(updateCategory).length === 0) {
      throw createError(StatusCodes.BAD_REQUEST, "Data can't be empty.");
    }

    const category = await new CategoryRepository().update(slug, updateCategory);
    if (category == null) throw createError(StatusCodes.BAD_REQUEST, "Category not found.");

    return category;
  }

  async delete(slug: string) {
    const category = await new CategoryRepository().remove(slug);

    return category;
  }
}