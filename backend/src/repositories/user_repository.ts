import DatabaseHelper from "../database/DatabaseHelper";
import UserInterface from "../interfaces/user_interface";
import User from "../models/User";

class UserRepository {

  connection: any = null;

  constructor() {
    this.connection = DatabaseHelper.getConnection();
  }

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

  async insertOne(user: UserInterface) {
    const created = await new User(user).save();

    return created;
  }

  async update(username: string, user: UserInterface) {
    const updated = User.findOneAndUpdate({username}, user, { runValidators: true });

    return updated;
  }

  async remove(username: string) {
    const removed = User.findOneAndRemove({username});

    return removed;
  }

}


export default UserRepository;