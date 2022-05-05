import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import ApiService from '../services/api_service';
import AuthService from '../services/auth_service';


export default class Authentication {

  constructor() {}

  authenticate(req: any, res: any, next: any) {
    try {
      if (
        !req.headers ||
        !req.headers.authorization
      ) throw createError(StatusCodes.UNAUTHORIZED, "Bearer token should be provided.");

      const token: string = req.headers.authorization.split(" ")[1];
      const decoded: any = new AuthService().checkJWT(token);

      next();
    } catch(err: any) {
      return new ApiService(res, StatusCodes.UNAUTHORIZED, false, err.message).sendResponse();
    }
  }

}