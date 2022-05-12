import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notification from "../../../components/notification";
import { ALERT_FAILED, ALERT_SUCCESS } from "../../../constants/alertStyles";
import { TIMEOUT, TIMEOUT_LONG } from "../../../constants/timeout";
import MainLayout from "../../../layouts/main";
import { getCategories } from "../../api/category";
import { getHobby, updateHobby } from "../../api/hobby";


export default function Edit() {
  const router = useRouter()
  const slug = router.query.slug
  const [notification, setNotification] = useState(null)
  const [categories, setCategories] = useState([])
  const [hobby, setHobby] = useState({})
  const [form, setForm] = useState({
    "name": "",
    "description": "",
    "category": ""
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

  const handleGetCategories = async () => {
    const foundCategories = await getCategories()
    setCategories(foundCategories.data.data.categories)
  }

  const handleUpdateHobby = async (e) => {
    e.preventDefault()
    try {
      const hobby = await updateHobby(slug, form)
      renderNotification(ALERT_SUCCESS, hobby.data.message)
      setTimeout(() => {
        router.push("/hobbies")
      }, TIMEOUT)
    } catch (err) {
      renderNotification(ALERT_FAILED, err.response.data.message)
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
      notification={notification}
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