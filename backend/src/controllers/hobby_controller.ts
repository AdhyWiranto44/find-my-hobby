import HobbyService from "../services/hobby_service";
import ApiService from "../services/api_service";
import { StatusCodes } from "http-status-codes";
import HobbyInterface from "../interfaces/hobby_interface";


class HobbyController {
  static index: any;

  constructor() {}

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

    if (queries.name) {
      filter["name"] = { $regex: queries.name + ".*", $options: 'i' };
    }

    try {
      const hobbies = await new HobbyService().getAll(filter, pagination.limit, pagination.skip);

      return new ApiService(
        res, StatusCodes.OK, true, 
        "Hobbies found.", 
        { 
          "total": hobbies.length,
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
    const queries = req.query;
    const filter: any = { "category": req.params.category }
    const pagination: any = { "limit": 1, "skip": 0 }

    for (const property in queries) {
      if (property == "limit" || property == "skip") {
        pagination[property] = parseInt(queries[property]);
      }
    }
    
    try {
      const hobbies = await new HobbyService().getByCategory(filter.category, pagination.limit, pagination.skip);

      return new ApiService(
        res, StatusCodes.OK, true, 
        `Hobbies found by category ${filter.category}.`, 
        { 
          "total": hobbies.length,
          "category": filter.category,
          "hobbies": hobbies
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async create(req: any, res: any) {
    try {
      const hobby = await new HobbyService().create(req.body);

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
      const hobby = await new HobbyService().update(req.body, req.params.slug);

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