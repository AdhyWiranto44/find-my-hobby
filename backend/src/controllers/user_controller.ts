import UserService from "../services/user_service";
import ApiService from "../services/api_service";
import AuthService from "../services/auth_service";


class UserController {
 
  async getAll(req: any, res: any) {
    try {
      new AuthService().checkJWT(req.query.token);
    } catch(err: any) {
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const users = await new UserService().getAll();

      return new ApiService(
        res, 200, true,
        "Users found.",
        {
          "users": users
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async getOne(req: any, res: any) {
    try {
      new AuthService().checkJWT(req.query.token);
    } catch(err: any) {
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const user = await new UserService().getOne(req.params.username);

      return new ApiService(
        res, 200, true,
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
      new AuthService().checkJWT(req.query.token);
    } catch(err: any) {
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const user = await new UserService().create(req);

      return new ApiService(
        res, 200, true,
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
      new AuthService().checkJWT(req.query.token);
    } catch(err: any) {
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const user = await new UserService().update(req, req.params.username);

      return new ApiService(
        res, 200, true,
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
      new AuthService().checkJWT(req.query.token);
    } catch(err: any) {
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const user = await new UserService().delete(req.params.slug);

      return new ApiService(
        res, 200, true,
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