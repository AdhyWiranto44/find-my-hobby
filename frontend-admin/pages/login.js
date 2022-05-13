import { useRouter } from 'next/router'
import { useState } from 'react'
import Title from '../components/title'
import { login } from './api/auth'
import Cookies from 'js-cookie'
import { tokenCookie } from '../constants/cookies'
import Link from 'next/link'
import Notification from '../components/notification'
import { TIMEOUT } from '../constants/timeout'
import { ALERT_FAILED, ALERT_SUCCESS } from '../constants/alertStyles'


export default function Login() {
  const [notification, setNotification] = useState("")
  const [form, setForm] = useState({
    "username": "",
    "password": ""
  })
  const router = useRouter()
  const token = Cookies.get(tokenCookie)

  if (token) router.push("/")

  const renderNotification = (color, message) => {
    setNotification(
      <Notification 
        color={color}
        message={message}
      />
    )
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      let jwt = await login(form)
      renderNotification(ALERT_SUCCESS, "Login success.")
      setTimeout(() => {
        Cookies.set(tokenCookie, jwt.data.data.token, { expires: 1/12 })
        router.push("/")
      }, TIMEOUT)
    } catch (err) {
      renderNotification(ALERT_FAILED, err.response.data.message)
    }
  }

  return (
    <div className="bg-salmon">
      {notification}
      <div className="container-fluid">
        <div className="row position-absolute h-100 w-100 overflow-hidden">
          <div className="col-lg-6 login d-flex align-items-center justify-content-center">
            <form className="login-form" onSubmit={(e) => handleLogin(e)}>
              <div className="text-center text-uppercase" style={{ letterSpacing: "3px" }}>
                <Title title="Login" />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label small mb-1">username</label>
                <input type="text" className="form-control p-3" id="username" name="username" onChange={(e) => setForm({...form, "username": e.target.value})} required autoFocus />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label small mb-1">password</label>
                <input type="password" className="form-control p-3" id="password" onChange={(e) => setForm({...form, "password": e.target.value})} name="password" required />
              </div>
              <div className="row gx-3">
                <div className="col-sm-3">
                  <Link href={`${process.env.NEXT_PUBLIC_VISITOR_DOMAIN || "http://localhost:3000"}`}>
                    <a className="btn btn-outline-secondary w-100 p-3 mt-3"><i className="bi bi-chevron-left"></i></a>
                  </Link>
                </div>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-salmon w-100 p-3 mt-3 fw-bold text-uppercase">login</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6 d-none d-lg-block p-0 overflow-hidden">
            <img className="w-100 h-100" src="/img/login_bg.jpg" alt="login_bg" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  )
}