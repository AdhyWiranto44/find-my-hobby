import DatabaseHelper from "../database/DatabaseHelper";
import { Category } from "../models/Category";


export default class CategoryRepository {

  connection: any = null;

  constructor() {
    this.connection = DatabaseHelper.getConnection();
  }
  
  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const categories = await Category.find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ created_at: -1 })
    .exec();

    return categories;
  }

  async getOne(slug: any) {
    const category = Category.findOne({ slug }).exec();

    return category;
  }

  async insertOne(category: any) {
    const created = await new Category(category).save();

    return created;
  }

  async update(slug: string, category: any) {
    const updated = Category.findOneAndUpdate({slug}, category, { runValidators: true });

    return updated;
  }

  async remove(slug: string) {
    const removed = Category.findOneAndRemove({slug});

    return removed;
  }

}