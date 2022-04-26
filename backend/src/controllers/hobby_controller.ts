import HobbyService from "../services/hobby_service";
import ApiService from "../services/api_service";
import AuthService from "../services/auth_service";


class HobbyController {
  static index: any;

  constructor() {}

  async getAll(req: any, res: any) {
    try {
      const hobbies = await new HobbyService().getAll();

      if (!hobbies) {
        return new ApiService(
          res, 404, false, "Hobbies empty."
        ).sendResponse();
      }

      return new ApiService(
        res, 200, true, 
        "Hobbies found.", 
        { 
          "hobbies": hobbies 
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async getOne(req: any, res: any) {
    try {
      const hobby = await new HobbyService().getOne(req.params.slug);
  
      if (!hobby) {
        return new ApiService(
          res, 404, false, "Hobby not found."
        ).sendResponse();
      }

      return new ApiService(
        res, 200, true, 
        "Hobby found.", 
        { 
          "hobby": hobby 
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
      const hobby = await new HobbyService().create(req);

      return new ApiService(
        res, 200, true, 
        "New hobby successfully created.", 
        { 
          "hobby": hobby 
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
      const hobby = await new HobbyService().update(req, req.params.slug);

      if (!hobby) {
        return new ApiService(
          res, 404, false, "Hobby not found."
        ).sendResponse();
      }

      return new ApiService(
        res, 200, true, 
        "Hobby successfully updated.", 
        { 
          "hobby": hobby 
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
      const hobby = await new HobbyService().delete(req.params.slug);

      if (!hobby) {
        return new ApiService(
          res, 404, false, "Hobby not found."
        ).sendResponse();
      }

      return new ApiService(
        res, 200, true, 
        "Hobby successfully removed.", 
        { 
          "hobby": hobby 
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

}


export default HobbyController;