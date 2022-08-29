import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main";
import { getRoles } from "../../api/role";
import { getUser, updateUser } from "../../api/user";
import notificationSuccess from "../../../helpers/notificationSuccess";
import notificationFailed from "../../../helpers/notificationFailed";
import Link from "next/link";


export default function Edit() {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [roles, setRoles] = useState([])
  const username = router.query.username
  const [form, setForm] = useState({
    "role": "",
  })

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
      notificationSuccess({
        message: User.data.message
      })
      router.push("/users")
    } catch (err) {
      notificationFailed({
        message: err.response.data.message
      })
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
                    <div className="row gx-3">
                      <div className="col-sm-2">
                        <Link href="/users">
                          <a className="btn btn-outline-secondary w-100 p-3 mt-3"><i className="bi bi-chevron-left"></i></a>
                        </Link>
                      </div>
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-salmon w-100 p-3 mt-3 fw-bold text-uppercase"><i className="bi bi-pencil-fill me-2"></i> ubah</button>
                      </div>
                    </div>
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