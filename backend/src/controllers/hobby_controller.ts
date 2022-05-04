import HobbyService from "../services/hobby_service";
import ApiService from "../services/api_service";
import AuthService from "../services/auth_service";
import { StatusCodes } from "http-status-codes";


class HobbyController {
  static index: any;

  constructor() {}

  async getAll(req: any, res: any) {
    const queries = req.query;
    const filter: any = {}
    for (const property in queries) {
      filter[property] = queries[property];
    }

    if (queries.name) {
      filter["name"] = { $regex: queries.name + ".*", $options: 'i' };
    }

    try {
      const hobbies = await new HobbyService().getAll(filter);

      return new ApiService(
        res, StatusCodes.OK, true, 
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

      return new ApiService(
        res, StatusCodes.OK, true, 
        "Hobby found.", 
        { 
          "hobby": hobby 
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async getByCategory(req: any, res: any) {
    try {
      const hobbies = await new HobbyService().getByCategory(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true, 
        "Hobbies found.", 
        { 
          "hobbies": hobbies
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async create(req: any, res: any) {
    try {
      const hobby = await new HobbyService().create(req);

      return new ApiService(
        res, StatusCodes.OK, true, 
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
      const hobby = await new HobbyService().update(req, req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true, 
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
      const hobby = await new HobbyService().delete(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true, 
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