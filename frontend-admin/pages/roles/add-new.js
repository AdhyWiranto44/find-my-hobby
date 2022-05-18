import { useRouter } from "next/router";
import { useState } from "react";
import Notification from "../../components/notification";
import { ALERT_FAILED, ALERT_SUCCESS } from "../../constants/alertStyles";
import { TIMEOUT, TIMEOUT_LONG } from "../../constants/timeout";
import MainLayout from "../../layouts/main";
import { createRole } from "../api/role";


export default function AddNew() {
  const [notification, setNotification] = useState(null)
  const router = useRouter()
  const [form, setForm] = useState({
    "name": ""
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

  const handleCreateNewRole = async (e) => {
    e.preventDefault()

    try {
      const role = await createRole(form)
      renderNotification(ALERT_SUCCESS, role.data.message)
      setTimeout(() => {
        router.push("/roles")
      }, TIMEOUT)
    } catch (err) {
      renderNotification(ALERT_FAILED, err.response.data.message)
    }
  }

  return (
    <MainLayout
      title="Tambah Hak Akses Baru"
      notification={notification}
      content={
        <>
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => handleCreateNewRole(e)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" className="form-control p-3" id="name" name="name" onChange={(e) => setForm({"name": e.target.value})} autoFocus required />
                    </div>
                    <button type="submit" className="btn btn-salmon w-100 p-3 mt-3 fw-bold text-uppercase"><i className="bi bi-plus-circle me-2"></i> tambah</button>
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