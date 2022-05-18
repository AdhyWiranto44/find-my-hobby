import { compareSync } from "bcrypt";
import { randomBytes } from "crypto";
import { sign, verify } from "jsonwebtoken";
import UserRepository from "../repositories/user_repository";
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';


class AuthService {

  constructor() { }

  async getUser(username: string = "") {
    const userRepository = new UserRepository();
    const user: any = await userRepository.getOne(username);

    return user;
  }

  async createJWT(loginData: any) {
  
    const user = await this.getUser(loginData.username);
    if (user == null) throw createError(StatusCodes.BAD_REQUEST, "User not found.");

    const isPasswordCorrect = compareSync(loginData.password, user.password);
    if (!isPasswordCorrect) throw createError(StatusCodes.BAD_REQUEST, "Password incorrect.");
    
    const payload = {
      "uid": randomBytes(16).toString('hex'),
      "username": user.username,
      "role": user.role
    }
    const encoded: any = sign(payload, process.env.SECRET as string, { expiresIn: process.env.TOKEN_EXPIRES_IN as string });

    return encoded;
  }

  checkJWT(token: string = "") {
    const decoded = verify(token, process.env.SECRET as string);

    return decoded;
  }

}


export default AuthService;