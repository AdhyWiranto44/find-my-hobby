import Cookies from "js-cookie"
import { tokenCookie } from "./cookies"


const headers = {
  "headers": {
    "Authorization": `Bearer ${Cookies.get(tokenCookie)}`
  }
}

export default headers