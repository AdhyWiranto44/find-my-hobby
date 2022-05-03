import { StatusCodes } from "http-status-codes";
import ApiService from "../services/api_service";
import AuthService from "../services/auth_service";
import SuggestionService from "../services/suggestion_service";


class SuggestionController {

  async getAll(req: any, res: any) {
    try {
      new AuthService().checkJWT(req.query.token);
    } catch(err: any) {
      return new ApiService(res, StatusCodes.UNAUTHORIZED, false, err.message).sendResponse();
    }

    try {
      const suggestions = await new SuggestionService().getAll();

      return new ApiService(
        res, StatusCodes.OK, true, 
        "Suggestions found.", 
        { 
          "suggestions": suggestions 
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

  async getByCategory(req: any, res: any) {
    try {
      new AuthService().checkJWT(req.query.token);
    } catch(err: any) {
      return new ApiService(res, StatusCodes.UNAUTHORIZED, false, err.message).sendResponse();
    }

    try {
      const suggestions = await new SuggestionService().getByCategory(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true, 
        "Suggestions found.", 
        { 
          "suggestions": suggestions
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
      return new ApiService(res, StatusCodes.UNAUTHORIZED, false, err.message).sendResponse();
    }

    try {
      const suggestion = await new SuggestionService().getOne(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true, 
        "Suggestion found.", 
        { 
          "suggestion": suggestion 
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
      return new ApiService(res, StatusCodes.UNAUTHORIZED, false, err.message).sendResponse();
    }

    try {
      const suggestion = await new SuggestionService().create(req);

      return new ApiService(
        res, StatusCodes.OK, true, 
        "New suggestion successfully created.", 
        { 
          "suggestion": suggestion 
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
      return new ApiService(res, StatusCodes.UNAUTHORIZED, false, err.message).sendResponse();
    }

    try {
      const suggestion = await new SuggestionService().update(req, req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true, 
        "Suggestion successfully updated.", 
        { 
          "suggestion": suggestion 
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
      return new ApiService(res, StatusCodes.UNAUTHORIZED, false, err.message).sendResponse();
    }

    try {
      const suggestion = await new SuggestionService().delete(req.params.slug);

      return new ApiService(
        res, StatusCodes.OK, true, 
        "Suggestion successfully removed.", 
        { 
          "suggestion": suggestion 
        }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

}


export default SuggestionController;