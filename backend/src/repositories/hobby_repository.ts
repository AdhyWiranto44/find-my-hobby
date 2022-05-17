import DatabaseHelper from "../database/DatabaseHelper";
import HobbyInterface from "../interfaces/hobby_interface";
import Hobby from "../models/Hobby";

export default class HobbyRepository {

  connection: any = null;

  constructor() {
    this.connection = DatabaseHelper.getConnection();
  }

  async getAll(filter: any = {}, limit: number = 1, skip: number = 0) {
    const hobbies = await Hobby
      .find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ created_at: -1 })
      .exec();

    return hobbies;
  }

  async getOne(slug: string = "") {
    const hobby = await Hobby.findOne({ slug }).exec()

    return hobby;
  }

  async insertOne(hobby: HobbyInterface) {
    const created = await new Hobby(hobby).save();

    return created;
  }

  async update(slug: string, hobby: HobbyInterface) {
    const updated = Hobby.findOneAndUpdate({slug}, hobby, { runValidators: true });

    return updated;
  }

  async remove(slug: string) {
    const removed = Hobby.findOneAndRemove({slug});

    return removed;
  }
}