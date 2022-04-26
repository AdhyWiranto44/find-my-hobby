import ApiService from "../services/api_service";
import AuthService from "../services/auth_service";


class AuthController {

  async login(req: any, res: any) {
    const loginData = {
      username: req.body.username,
      password: req.body.password
    }

    try {
      const authService = new AuthService();
      const token = await authService.createJWT(loginData);
  
      return new ApiService(
        res, 200, true, "JWT Created.", { "token": token }
      ).sendResponse();
    } catch (err: any) {
      return new ApiService(res).sendErrorResponse(err);
    }
  }

}


export default AuthController;