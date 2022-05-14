import { useRouter } from "next/router"
import Cookies from 'js-cookie'
import { tokenCookie, usernameCookie } from "../constants/cookies"
import { TIMEOUT } from '../constants/timeout'
import { ALERT_SUCCESS } from '../constants/alertStyles'
import Image from 'next/image'


export default function Navbar(props) {
  const router = useRouter()
  const username = Cookies.get(usernameCookie) || "username"
  
  const handleLogout = (e) => {
    e.preventDefault()
    const isConfirmed = confirm("Yakin ingin logout?")
    if (isConfirmed) {
      props.renderNotification(ALERT_SUCCESS, "Logout success.")
      setTimeout(() => {
        Cookies.remove(tokenCookie)
        Cookies.remove(usernameCookie)
        router.push("/login")
      }, TIMEOUT)
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light py-3 sticky-top py-3 border-bottom border-light border-2">
      <div className="container-fluid">
        <div className="navbarLeftMenu">
          <button type="button" className="border-0 bg-transparent" onClick={props.toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="userProfile d-flex align-items-center">
          <small className="d-none d-md-inline text-end">Selamat datang! <br /><b>{username}</b></small>
          <div className="btn-group dropstart">
            <button type="button" className="btn btn-secondary dropdown-toggle border-0 bg-transparent" data-bs-toggle="dropdown" aria-expanded="false">
              <Image className="rounded-circle" src="/img/default.jpg" alt="default" width="36" height="36" />
            </button>
            <ul className="dropdown-menu border-0 shadow">
              <li>
                <form onSubmit={(e) => handleLogout(e)}>
                  <button type="submit" className="btn dropdown-item px-3 py-2 fw-bold"><i className="bi bi-box-arrow-right me-1"></i> Logout</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}