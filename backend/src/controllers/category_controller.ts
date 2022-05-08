import CategoryService from "../services/category_service";
import ApiService from "../services/api_service";
import { StatusCodes } from "http-status-codes";


class CategoryController {
 
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
      const categories = await new CategoryService().getAll(filter);

      return new ApiService(
        res, StatusCodes.OK, true,
        "Categories found.",
        {
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
      const category = await new CategoryService().create(req);

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
      const category = await new CategoryService().update(req, req.params.slug);

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