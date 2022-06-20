import ApiService from "../services/api_service";
import { StatusCodes } from "http-status-codes";
import RoleService from "../services/role_service";


class RoleController {
 
  async getAll(req: any, res: any) {
    const queries = req.query;
    const filter: any = {}
    const pagination: any = { "limit": 1, "skip": 0 }

    for (const property in queries) {
      if (property == "limit" || property == "skip") {
        pagination[property] = parseInt(queries[property]);
      } else {
        filter[property] = queries[property];
      }
    }

    if (queries.name) {
      filter["name"] = { $regex: queries.name + ".*", $options: 'i' };
    }

    try {
      const roles = await new RoleService().getAll(filter, pagination.limit, pagination.skip);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Roles found.",
        {
          "total": roles.length,
          "roles": roles
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async getOne(req: any, res: any) {
    try {
      const role = await new RoleService().getOne(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Role found.",
        {
          "Role": role
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async create(req: any, res: any) {
    try {
      const role = await new RoleService().create(req.body);

      return new ApiService(
        res, StatusCodes.OK, true,
        "New role successfully created.",
        {
          "role": role
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async update(req: any, res: any) {
    try {
      const role = await new RoleService().update(req.body, req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Role successfully updated.",
        {
          "role": role
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async delete(req: any, res: any) {
    try {
      const role = await new RoleService().delete(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Role successfully deleted.",
        {
          "role": role
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

}


export default RoleController;