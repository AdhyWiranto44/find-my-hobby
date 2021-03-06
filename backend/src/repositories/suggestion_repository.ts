import ConnectionPostgres from "../database/ConnectionPostgres";
import DatabaseHelper from "../database/DatabaseHelper";
import SuggestionInterface from "../interfaces/suggestion_interface";
import Suggestion from "../../models/Suggestion";
import { DataTypes, Op } from "sequelize";


export default class SuggestionRepository {

  connection: any = null;

  constructor() {
    this.connection = ConnectionPostgres.connect();
  }
  
  async getAll(filter: any = {}, limit: number = 1, skip: number = 0) {
    const suggestions = await Suggestion(this.connection, DataTypes)
      .findAll({
        where: {
          ...filter,
          name: {
            [Op.like]: filter.name !== undefined ? `${filter.name}%` : `%`
          }
        }, limit: limit, offset: skip,
        order: [['createdAt', 'DESC']]
      });

    return suggestions;
  }

  async getOne(slug: any) {
    const suggestion = await Suggestion(this.connection, DataTypes)
    .findOne({
      where: {slug}
    });

    return suggestion;
  }

  async insertOne(suggestion: SuggestionInterface) {
    await Suggestion(this.connection, DataTypes)
    .create(
      {...suggestion, createdAt: new Date(), updatedAt: new Date()}
    );

  const created = await Suggestion(this.connection, DataTypes)
    .findOne(
      {where: {slug: suggestion.slug}}
    );

    return created;
  }

  async update(slug: string, suggestion: SuggestionInterface) {
    await Suggestion(this.connection, DataTypes)
      .update(
        {...suggestion, updatedAt: new Date()}, 
        {where: {slug: slug}
      });

    const updated = await Suggestion(this.connection, DataTypes)
      .findOne(
        {where: {slug}}
      );

    return updated;
  }

  async remove(slug: string) {
    const removed = await Suggestion(this.connection, DataTypes)
    .findOne(
      {where: {slug}}
    );

    await Suggestion(this.connection, DataTypes)
      .destroy({
        where: {slug}
      });

    return removed;
  }

}