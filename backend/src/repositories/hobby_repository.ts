import Hobby from "../models/Hobby";

export default class HobbyRepository {

  constructor() {}

  async getAll() {
    const hobbies = await Hobby.find().sort({ created_at: -1 }).exec();

    return hobbies;
  }

  async getOne(slug: string = "") {
    const hobby = await Hobby.findOne({ slug }).exec()

    return hobby;
  }

  async insertOne(hobby: any) {
    const created = await new Hobby(hobby).save();

    return created;
  }

  async update(slug: string, hobby: any) {
    const updated = Hobby.findOneAndUpdate({slug}, hobby);

    return updated;
  }

  async remove(slug: string) {
    const removed = Hobby.findOneAndRemove({slug});

    return removed;
  }
}