import User from "../models/User";

class UserRepository {

  constructor() {}

  async getAll(filter: any = {}, limit: number = 1, skip: number = 0) {
    const users = await User.find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ created_at: -1 })
    .exec();

    return users;
  }

  async getOne(username: string) {
    let user = await User.findOne({ "username": username });
    return user;
  }

  async insertOne(user: any) {
    const created = await new User(user).save();

    return created;
  }

  async update(slug: string, user: any) {
    const updated = User.findOneAndUpdate({slug}, user, { runValidators: true });

    return updated;
  }

  async remove(slug: string) {
    const removed = User.findOneAndRemove({slug});

    return removed;
  }

}


export default UserRepository;