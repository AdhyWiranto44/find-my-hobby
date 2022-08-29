import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import notificationFailed from "../../../helpers/notificationFailed";
import notificationSuccess from "../../../helpers/notificationSuccess";
import MainLayout from "../../../layouts/main";
import { getRole, updateRole } from "../../api/role";


export default function Edit() {
  const router = useRouter()
  const [role, setRole] = useState({})
  const slug = router.query.slug
  const [form, setForm] = useState({
    "name": ""
  })

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
      notificationSuccess({
        message: role.data.message
      })
      router.push("/roles")
    } catch (err) {
      notificationFailed({
        message: err.response.data.message
      })
    }
  }

  useEffect(() => {
    handleGetRole(slug)
  }, [handleGetRole, slug])

  return (
    <MainLayout
      title="Ubah Hak Akses"
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
                    <div className="row gx-3">
                      <div className="col-sm-2">
                        <Link href="/roles">
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