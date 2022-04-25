import User from "../models/User";

class UserRepository {

  constructor() {}

  async getUser(username: string) {
    let user = await User.findOne({ "username": username });
    return user;
  }

}


export default UserRepository;