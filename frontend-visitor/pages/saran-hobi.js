import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { getCategories } from './api/category'
import Footer from '../components/footer'
import { createSuggestion } from "./api/suggestion"
import NavbarLogoOnly from "../components/navbarLogoOnly"


export default function SaranHobi() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    "name": "",
    "description": "",
    "category": ""
  })

  const handleCreateNewSuggestion = async (e) => {
    e.preventDefault()
    const suggestion = await createSuggestion(form)
    router.reload()
  }

  const handleGetCategories = async () => {
    let foundCategories = await getCategories()
    foundCategories = foundCategories.data.data.categories
    setCategories(foundCategories)
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  return (
    <>
      <NavbarLogoOnly />
      <div className="container">
        <div className="row mt-3">
          <div className="col-md">
            <h1 className="fw-bold text-center">Saran Hobi</h1>
            <p className="text-center">Tambah saran hobi jika belum ada</p>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-8 offset-md-2">
            <div className="card bg-transparent border-0">
              <div className="card-body">
                <form onSubmit={(e) => handleCreateNewSuggestion(e)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label small mb-1 text-capitalize">nama hobi</label>
                    <input type="text" className="form-control p-3" id="name" name="name" onChange={(e) => setForm({...form, "name": e.target.value})} style={{borderRadius: "15px"}} autoFocus required />
                  </div>
                  <div className="mb-3">
                    <label className="text-muted" htmlFor="description"><small>Deskripsi</small></label>
                    <textarea className="form-control" id="description" name="description" rows="15" style={{borderRadius: "15px"}} onChange={(e) => setForm({...form, "description": e.target.value})} required></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="unit" className="form-label small mb-1 text-capitalize">kategori</label>
                    <select className="form-select p-3" aria-label="Default select example" id="unit" name="unit" style={{borderRadius: "15px"}} onChange={(e) => setForm({...form, "category": e.target.value})} required>
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
                  <div className="mb-3">
                    <label htmlFor="suggester_email" className="form-label small mb-1 text-capitalize">email</label>
                    <input type="email" className="form-control p-3" id="suggester_email" name="suggester_email" style={{borderRadius: "15px"}} onChange={(e) => setForm({...form, "suggester_email": e.target.value})} />
                  </div>
                  <button type="submit" className="btn btn-warning shadow w-100 p-3 mt-3 fw-bold text-uppercase" style={{borderRadius: "15px"}}><i className="bi bi-plus-circle me-2"></i> tambah</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}