import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TIMEOUT } from "../../../constants/timeout";
import notificationFailed from "../../../helpers/notificationFailed";
import notificationSuccess from "../../../helpers/notificationSuccess";
import MainLayout from "../../../layouts/main";
import { getCategories } from "../../api/category";
import { getHobby, updateHobby } from "../../api/hobby";


export default function Edit() {
  const router = useRouter()
  const slug = router.query.slug
  const [categories, setCategories] = useState([])
  const [hobby, setHobby] = useState({})
  const [form, setForm] = useState({
    "name": "",
    "description": "",
    "community_name": "",
    "community_link": "",
    "category": ""
  })

  const handleGetCategories = async () => {
    const foundCategories = await getCategories()
    setCategories(foundCategories.data.data.categories)
  }

  const handleUpdateHobby = async (e) => {
    e.preventDefault()
    try {
      const hobby = await updateHobby(slug, form)
      notificationSuccess({
        message: hobby.data.message
      })
      router.push("/hobbies")
    } catch (err) {
      notificationFailed({
        message: err.response.data.message
      })
    }
  }

  const handleGetHobby = async (slug = "") => {
    let foundHobby = await getHobby(slug)
    foundHobby = foundHobby.data.data.hobby
    setHobby(foundHobby)
    setForm(foundHobby)
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  useEffect(() => {
    handleGetHobby(slug)
  }, [slug])

  return (
    <MainLayout
      title="Ubah Hobi"
      content={
        <>
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => handleUpdateHobby(e)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" className="form-control p-3" id="name" name="name" value={form.name} onChange={(e) => setForm({...form, "name": e.target.value})} autoFocus required />
                    </div>
                    <div className="mb-3">
                      <label className="text-muted" htmlFor="description"><small>Deskripsi</small></label>
                      <textarea className="form-control" id="description" name="description" rows="15" value={form.description} onChange={(e) => setForm({...form, "description": e.target.value})} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="community_name" className="form-label small mb-1 text-capitalize">nama komunitas</label>
                      <input type="text" className="form-control p-3" id="community_name" name="community_name" value={form.community_name} onChange={(e) => setForm({...form, "community_name": e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="community_link" className="form-label small mb-1 text-capitalize">link komunitas</label>
                      <input type="text" className="form-control p-3" id="community_link" name="community_link" value={form.community_link} onChange={(e) => setForm({...form, "community_link": e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="unit" className="form-label small mb-1 text-capitalize">kategori</label>
                      <select className="form-select p-3" aria-label="Default select example" id="unit" name="unit" value={form.category} onChange={(e) => setForm({...form, "category": e.target.value})} required>
                        <option value="" selected>-- Pilih Kategori --</option>
                        {
                          categories.map((category, idx) => {
                            return (
                              <option key={idx} value={category.slug}>{category.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="row gx-3">
                      <div className="col-sm-2">
                        <Link href="/hobbies">
                          <a className="btn btn-outline-secondary w-100 p-3 mt-3"><i className="bi bi-chevron-left"></i></a>
                        </Link>
                      </div>
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-salmon w-100 p-3 mt-3 fw-bold text-uppercase"><i className="bi bi-pencil-fill me-2"></i> Ubah</button>
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