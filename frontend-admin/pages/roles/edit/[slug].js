import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Notification from "../../../components/notification";
import { ALERT_FAILED, ALERT_SUCCESS } from "../../../constants/alertStyles";
import { TIMEOUT, TIMEOUT_LONG } from "../../../constants/timeout";
import MainLayout from "../../../layouts/main";
import { getCategory, updateCategory } from "../../api/category";
import { getRole, updateRole } from "../../api/role";


export default function Edit() {
  const router = useRouter()
  const [notification, setNotification] = useState(null)
  const [role, setRole] = useState({})
  const slug = router.query.slug
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

  const handleGetRole = useCallback( async () => {
    let foundRole = await getRole(slug)
    foundRole = foundRole.data.data.Role
    setRole(foundRole)
    setForm(foundRole)
  }, [slug])

  const handleUpdateRole = async (e) => {
    e.preventDefault()

    try {
      const role = await updateRole(slug, form)
      renderNotification(ALERT_SUCCESS, role.data.message)
      setTimeout(() => {
        router.push("/roles")
      }, TIMEOUT)
    } catch (err) {
      renderNotification(ALERT_FAILED, err.response.data.message)
    }
  }

  useEffect(() => {
    handleGetRole(slug)
  }, [handleGetRole, slug])

  return (
    <MainLayout
      title="Ubah Hak Akses"
      notification={notification}
      content={
        <>
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => handleUpdateRole(e)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" className="form-control p-3" id="name" name="name" value={form.name} onChange={(e) => setForm({"name": e.target.value})} autoFocus required />
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