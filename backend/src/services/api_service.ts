import chalk from 'chalk';
import { StatusCodes } from 'http-status-codes';


class ApiService {

  response: any;
  status_code: number;
  success: boolean;
  message: string;
  data: any;
  response_data: any;

  constructor(
    response: any = "", 
    status_code: number = 0, 
    success: boolean = true, 
    message: string = "", 
    data: any = {}
  ) {
    this.response = response;
    this.status_code = status_code;
    this.success = success;
    this.message = message;
    this.data = data;
    this.response_data = {
      success: this.success,
      message: this.message,
      data: this.data
    }
  }

  sendResponse() {
    if (this.status_code >= 400) {
      console.error(chalk.black.bgRed(`[${new Date()}] ${this.message}`));
    } else {
      console.log(chalk.black.bgGreen(`[${new Date()}] ${this.message}`));
    }
    return this.response.status(this.status_code).json(this.response_data);
  }

  sendErrorResponse(err: any) {
    return new ApiService(
      this.response, err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, false, err.message
    ).sendResponse();
  }

}


export default ApiService;