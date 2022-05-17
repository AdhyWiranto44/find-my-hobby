import UserService from "../services/user_service";
import ApiService from "../services/api_service";
import AuthService from "../services/auth_service";
import createError from 'http-errors';
import { StatusCodes } from "http-status-codes";


class UserController {
 
  async getAll(req: any, res: any) {
    const queries = req.query;
    const filter: any = {}
    const pagination: any = { "limit": 1, "skip": 0 }
    
    for (const property in queries) {
      if (property == "limit" || property == "skip") {
        pagination[property] = parseInt(queries[property]);
      }
      filter[property] = queries[property];
    }

    if (queries.username) {
      filter["username"] = { $regex: queries.username + ".*", $options: 'i' };
    }

    try {
      const users = await new UserService().getAll(filter, pagination.limit, pagination.skip);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Users found.",
        {
          "total": users.length,
          "users": users
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async getOne(req: any, res: any) {
    try {
      const user = await new UserService().getOne(req.params.username);

      return new ApiService(
        res, StatusCodes.OK, true,
        "User found.",
        {
          "user": user
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async create(req: any, res: any) {
    try {
      const user = await new UserService().create(req.body);

      return new ApiService(
        res, StatusCodes.OK, true,
        "New user successfully created.",
        {
          "user": user
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async update(req: any, res: any) {
    try {
      const user = await new UserService().update(req.body, req.params.username);

      return new ApiService(
        res, StatusCodes.OK, true,
        "User successfully updated.",
        {
          "user": user
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async delete(req: any, res: any) {
    try {
      const user = await new UserService().delete(req.params.username);

      return new ApiService(
        res, StatusCodes.OK, true,
        "User successfully deleted.",
        {
          "user": user
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

}


export default UserController;