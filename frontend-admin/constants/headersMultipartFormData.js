import Cookies from "js-cookie"
import { tokenCookie } from "./cookies"


const headersMultipartFormData = {
  "headers": {
    "Authorization": `Bearer ${Cookies.get(tokenCookie)}`, 
    "Content-Type": `multipart/form-data`
  }
}

export default headersMultipartFormData