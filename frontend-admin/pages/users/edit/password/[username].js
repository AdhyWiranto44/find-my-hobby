import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { tokenCookie, usernameCookie } from "../../../../constants/cookies";
import notificationFailed from "../../../../helpers/notificationFailed";
import notificationSuccess from "../../../../helpers/notificationSuccess";
import MainLayout from "../../../../layouts/main";
import { updateUser } from "../../../api/user";


export default function Edit() {
  const router = useRouter()
  const username = router.query.username
  const [form, setForm] = useState({
    "password": "",
    "confirm_password": ""
  })

  const handleUpdateUser = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirm_password) {
      return notificationFailed({
        message: "password and confirm_password should be same."
      })
    }

    try {
      const User = await updateUser(username, form)
      notificationSuccess({
        message: User.data.message
      })

      if (username === Cookies.get(usernameCookie)) {
        Cookies.remove(tokenCookie)
        Cookies.remove(usernameCookie)

        notificationSuccess({
          message: "Password berhasil diganti, silahkan login ulang."
        })

        router.push("/login")
      } else {
        router.push("/users")
      }
    } catch (err) {
      notificationFailed({
        message: err.response.data.message
      })
    }
  }

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
                      <label htmlFor="password" className="form-label small mb-1 text-capitalize">Password</label>
                      <input type="password" className="form-control p-3" id="password" name="password" value={form.password} onChange={(e) => setForm({...form, "password": e.target.value})} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirm_password" className="form-label small mb-1 text-capitalize">Konfirmasi Password</label>
                      <input type="password" className="form-control p-3" id="confirm_password" name="confirm_password" value={form.confirm_password} onChange={(e) => setForm({...form, "confirm_password": e.target.value})} required />
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