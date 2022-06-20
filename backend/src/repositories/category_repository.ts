import ConnectionPostgres from "../database/ConnectionPostgres";
import CategoryInterface from "../interfaces/category_interface";
import { Category } from "../models/Category";
import { QueryTypes } from 'sequelize';


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
    const created = await this.connection.query(
      `INSERT INTO categories ("name", "slug", "createdAt", "updatedAt") VALUES (:name, :slug, :createdAt, :updatedAt)`,
      {
        replacements: {
          ...category,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        type: QueryTypes.INSERT
      }
      );

    return created;
  }

  async update(slug: string, category: CategoryInterface) {
    const updated = this.connection.query(
      `UPDATE categories SET "name" = :name, "updatedAt" = :updatedAt WHERE "slug" = :slug`,
      {
        replacements: {
          name: category.name,
          updatedAt: new Date(),
          slug: slug
        },
        type: QueryTypes.UPDATE
      }
    )

    return updated;
  }

  async remove(slug: string) {
    const removed = this.connection.query(`DELETE FROM categories WHERE slug = '${slug}'`);

    return removed;
  }

}