import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
    "category": ""
  })

  const handleGetCategories = async () => {
    const foundCategories = await getCategories()
    setCategories(foundCategories.data.data.categories)
  }

  const handleUpdateHobby = async (e) => {
    e.preventDefault()
    const hobby = await updateHobby(slug, form)
    router.push("/hobbies")
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
  }, [])

  return (
    <MainLayout
      title="Ubah Hobi"
      content={
        <>
          <div class="row">
            <div class="col-md-8">
              <div class="card shadow-sm border-0">
                <div class="card-body">
                  <form onSubmit={(e) => handleUpdateHobby(e)}>
                    <div class="mb-3">
                      <label for="name" class="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" class="form-control p-3" id="name" name="name" value={form.name} onChange={(e) => setForm({...form, "name": e.target.value})} autofocus required />
                    </div>
                    <div className="mb-3">
                      <label class="text-muted" for="description"><small>Deskripsi</small></label>
                      <textarea class="form-control" id="description" name="description" rows="15" value={form.description} onChange={(e) => setForm({...form, "description": e.target.value})} required></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="unit" class="form-label small mb-1 text-capitalize">kategori</label>
                      <select class="form-select p-3" aria-label="Default select example" id="unit" name="unit" value={form.category} onChange={(e) => setForm({...form, "category": e.target.value})} required>
                        <option value="" selected>-- Pilih Kategori --</option>
                        {
                          categories.map(category => {
                            return (
                              <option value={category.slug}>{category.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <button type="submit" class="btn btn-salmon w-100 p-3 mt-3 fw-bold text-uppercase"><i class="bi bi-plus-circle me-2"></i> tambah</button>
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