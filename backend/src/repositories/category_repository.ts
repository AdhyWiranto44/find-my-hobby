import ConnectionPostgres from "../database/ConnectionPostgres";
import CategoryInterface from "../interfaces/category_interface";
import Category from "../../models/Category";
import { DataTypes } from 'sequelize';


export default class CategoryRepository {

  connection: any = null;

  constructor() {
    this.connection = ConnectionPostgres.connect();
  }

  async getAll(filter = {}, limit: number = 1, skip: number = 0) {
    const categories = Category(this.connection, DataTypes)
      .findAll({
        where: filter, limit: limit, offset: skip,
        order: [['createdAt', 'DESC']]
      });

    return categories;
  }

  async getOne(slug: any) {
    const category = Category(this.connection, DataTypes)
    .findOne({
      where: {slug}
    });

    return category;
  }

  async insertOne(category: CategoryInterface) {
    Category(this.connection, DataTypes)
    .create(
      {...category, createdAt: new Date(), updatedAt: new Date()}
    );

    const created = Category(this.connection, DataTypes)
      .findOne(
        {where: {slug: category.slug}}
      );

    return created;
  }

  async update(slug: string, category: CategoryInterface) {
    Category(this.connection, DataTypes)
      .update(
        {...category, updatedAt: new Date()}, 
        {where: {slug: slug}
      });

    const updated = Category(this.connection, DataTypes)
      .findOne(
        {where: {slug}}
      );

    return updated;
  }

  async remove(slug: string) {
    const removed = Category(this.connection, DataTypes)
    .findOne(
      {where: {slug}}
    );

    Category(this.connection, DataTypes)
      .destroy({
        where: {slug}
      });

    return removed;
  }

}