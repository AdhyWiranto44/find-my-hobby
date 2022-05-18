import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Notification from "../../../../components/notification";
import { ALERT_FAILED, ALERT_SUCCESS } from "../../../../constants/alertStyles";
import { TIMEOUT, TIMEOUT_LONG } from "../../../../constants/timeout";
import MainLayout from "../../../../layouts/main";
import { getRoles } from "../../../api/role";
import { getUser, updateUser } from "../../../api/user";


export default function Edit() {
  const router = useRouter()
  const [notification, setNotification] = useState(null)
  const username = router.query.username
  const [form, setForm] = useState({
    "password": "",
    "confirm_password": ""
  })

  const renderNotification = (color, message) => {
    setNotification(
      <Notification 
        color={color}
        message={message}
      />
    )
    setTimeout(() => {
      setNotification("")
    }, TIMEOUT_LONG)
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirm_password) {
      return renderNotification(ALERT_FAILED, "password and confirm_password should be same.")
    }

    try {
      const User = await updateUser(username, form)
      renderNotification(ALERT_SUCCESS, User.data.message)
      setTimeout(() => {
        router.push("/users")
      }, TIMEOUT)
    } catch (err) {
      renderNotification(ALERT_FAILED, err.response.data.message)
    }
  }

  return (
    <MainLayout
      title={`Ubah Pengguna: ${username}`}
      notification={notification}
      content={
        <>
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => handleUpdateUser(e)}>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label small mb-1 text-capitalize">Password</label>
                      <input type="password" className="form-control p-3" id="password" name="password" value={form.password} onChange={(e) => setForm({...form, "password": e.target.value})} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirm_password" className="form-label small mb-1 text-capitalize">Konfirmasi Password</label>
                      <input type="password" className="form-control p-3" id="confirm_password" name="confirm_password" value={form.confirm_password} onChange={(e) => setForm({...form, "confirm_password": e.target.value})} required />
                    </div>
                    <button type="submit" className="btn btn-salmon w-100 p-3 mt-3 fw-bold text-uppercase"><i className="bi bi-plus-circle me-2"></i> ubah</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}