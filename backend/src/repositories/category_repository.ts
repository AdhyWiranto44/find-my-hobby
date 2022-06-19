import ConnectionPostgres from "../database/ConnectionPostgres";
import CategoryInterface from "../interfaces/category_interface";
import { Category } from "../models/Category";


export default class CategoryRepository {

  connection: any = null;

  constructor() {
    this.connection = ConnectionPostgres.connect();
  }

  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const [categories, metadata] = await this.connection.query(`SELECT * FROM categories LIMIT ${limit} OFFSET ${skip}`)

    return categories;
  }

  async getOne(slug: any) {
    const [category, metadata] = await this.connection.query(`SELECT * FROM categories WHERE slug = '${slug}'`);

    return category;
  }

  async insertOne(category: CategoryInterface) {
    const created = await new Category(category).save();

    return created;
  }

  async update(slug: string, category: CategoryInterface) {
    const updated = Category.findOneAndUpdate({slug}, category, { runValidators: true });

    return updated;
  }

  async remove(slug: string) {
    const removed = this.connection.query(`DELETE FROM categories WHERE slug = '${slug}'`);

    return removed;
  }

}