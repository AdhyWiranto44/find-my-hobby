import CategoryService from "../services/category_service";
import ApiService from "../services/api_service";
import { StatusCodes } from "http-status-codes";


class CategoryController {
 
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

    try {
      const categories = await new CategoryService().getAll(filter, pagination.limit, pagination.skip);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Categories found.",
        {
          "total": categories.length,
          "categories": categories
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async getOne(req: any, res: any) {
    try {
      const category = await new CategoryService().getOne(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Category found.",
        {
          "category": category
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async create(req: any, res: any) {
    try {
      const category = await new CategoryService().create(req.body);

      return new ApiService(
        res, StatusCodes.OK, true,
        "New category successfully created.",
        {
          "category": category
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async update(req: any, res: any) {
    try {
      const category = await new CategoryService().update(req.body, req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Category successfully updated.",
        {
          "category": category
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async delete(req: any, res: any) {
    try {
      const category = await new CategoryService().delete(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Category successfully deleted.",
        {
          "category": category
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

}


export default CategoryController;