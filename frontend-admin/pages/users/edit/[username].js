import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ALERT_FAILED, ALERT_SUCCESS } from "../../../constants/alertStyles";
import { TIMEOUT, TIMEOUT_LONG } from "../../../constants/timeout";
import MainLayout from "../../../layouts/main";
import { getRoles } from "../../api/role";
import { getUser, updateUser } from "../../api/user";
import Notification from "../../../components/notification";


export default function Edit() {
  const router = useRouter()
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState({})
  const [roles, setRoles] = useState([])
  const username = router.query.username
  const [form, setForm] = useState({
    "role": "",
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

  const handleGetUser = async (username = "") => {
    let foundUser = await getUser(username)
    foundUser = foundUser.data.data.user
    setUser(foundUser)
    setForm(foundUser)
  }

  const handleGetRoles = async () => {
    const foundRoles = await getRoles()
    setRoles(foundRoles.data.data.roles)
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()

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

  useEffect(() => {
    handleGetUser(username)
  }, [username])

  useEffect(() => {
    handleGetRoles()
  }, [])

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
                      <label htmlFor="role" className="form-label small mb-1 text-capitalize">Role</label>
                      <select className="form-select p-3" aria-label="Default select example" id="role" name="role" value={form.role} onChange={(e) => setForm({...form, "role": e.target.value})} required>
                        <option value="" selected>-- Pilih Role --</option>
                        {
                          roles.map((role, idx) => {
                            return (
                              <option key={idx} value={role.slug}>{role.name}</option>
                            )
                          })
                        }
                      </select>
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