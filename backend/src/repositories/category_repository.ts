import { Category } from "../models/Category";

export default class CategoryRepository {

  constructor() {}

  async findOne(slug: any) {
    const category = Category.findOne({ slug }).exec();

    return category;
  }

}