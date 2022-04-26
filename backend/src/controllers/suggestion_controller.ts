import showAlert from "../helpers/show_alert";
import { Category } from "../models/Category";
import Hobby from "../models/Hobby";
import Suggestion from "../models/Suggestion";
import ApiService from "../services/api_service";
import AuthService from "../services/auth_service";
import SuggestionService from "../services/suggestion_service";


class SuggestionController {

  async getAll(req: any, res: any) {
    try {
      new AuthService().checkJWT(req.query.token);
    } catch(err: any) {
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const suggestions = await new SuggestionService().getAll();

      return new ApiService(
        res, 200, true, 
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
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const suggestion = await new SuggestionService().getOne(req.params.slug);

      return new ApiService(
        res, 200, true, 
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
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const suggestion = await new SuggestionService().create(req);

      return new ApiService(
        res, 200, true, 
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
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const suggestion = await new SuggestionService().update(req, req.params.slug);

      return new ApiService(
        res, 200, true, 
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
      return new ApiService(res, 404, false, err.message).sendResponse();
    }

    try {
      const suggestion = await new SuggestionService().delete(req.params.slug);

      return new ApiService(
        res, 200, true, 
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