import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Title from "../../components/title";
import MainLayout from "../../layouts/main";
import { getCategories } from "../api/category";
import { createHobby } from "../api/hobby";


export default function AddNew() {
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const defaultForm = {
    "name": "",
    "description": "",
    "category": ""
  }
  const [form, setForm] = useState(defaultForm)

  const handleGetCategories = async () => {
    const foundCategories = await getCategories()
    setCategories(foundCategories.data.data.categories)
  }

  const handleCreateNewHobby = async (e) => {
    e.preventDefault()
    const hobby = await createHobby(form)
    router.reload()
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  useEffect(() => {
    console.log(form)
  })

  return (
    <MainLayout
      title="Tambah Hobi Baru"
      content={
        <>
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => handleCreateNewHobby(e)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" className="form-control p-3" id="name" name="name" onChange={(e) => setForm({...form, "name": e.target.value})} autofocus required />
                    </div>
                    <div className="mb-3">
                      <label className="text-muted" htmlFor="description"><small>Deskripsi</small></label>
                      <textarea className="form-control" id="description" name="description" rows="15" onChange={(e) => setForm({...form, "description": e.target.value})} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="unit" className="form-label small mb-1 text-capitalize">kategori</label>
                      <select className="form-select p-3" aria-label="Default select example" id="unit" name="unit" onChange={(e) => setForm({...form, "category": e.target.value})} required>
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