import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import notificationFailed from "../../helpers/notificationFailed";
import notificationSuccess from "../../helpers/notificationSuccess";
import MainLayout from "../../layouts/main";
import { getRoles } from "../api/role";
import { createUser } from "../api/user";


export default function AddNew() {
  const [roles, setRoles] = useState([])
  const router = useRouter()
  const [form, setForm] = useState({
    "username": "",
    "role": "",
    "password": "",
    "confirm_password": ""
  })

  const handleGetRoles = useCallback( async () => {
    const foundRoles = await getRoles()
    setRoles(foundRoles.data.data.roles)
  })

  useEffect(() => {
    handleGetRoles()
  }, [handleGetRoles])

  const handleCreateNewUser = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirm_password) {
      return notificationFailed({
        message: "password and confirm_password should be same."
      })
    }

    try {
      const user = await createUser(form)
      notificationSuccess({
        message: user.data.message
      })
      router.push("/users")
    } catch (err) {
      notificationFailed({
        message: err.response.data.message
      })
    }
  }

  return (
    <MainLayout
      title="Tambah Pengguna Baru"
      content={
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => handleCreateNewUser(e)}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label small mb-1 text-capitalize">Username</label>
                      <input type="text" className="form-control p-3" id="username" name="username" onChange={(e) => setForm({...form, "username": e.target.value})} autoFocus required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="role" className="form-label small mb-1 text-capitalize">Role</label>
                      <select className="form-select p-3" aria-label="Default select example" id="role" name="role" onChange={(e) => setForm({...form, "role": e.target.value})} required>
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
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label small mb-1 text-capitalize">Password</label>
                      <input type="password" className="form-control p-3" id="password" name="password" onChange={(e) => setForm({...form, "password": e.target.value})} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirm_password" className="form-label small mb-1 text-capitalize">Konfirmasi Password</label>
                      <input type="password" className="form-control p-3" id="confirm_password" name="confirm_password" onChange={(e) => setForm({...form, "confirm_password": e.target.value})} required />
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