import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main";
import { getCategory, updateCategory } from "../../api/category";


export default function Edit() {
  const router = useRouter()
  const [category, setCategory] = useState({})
  const slug = router.query.slug
  const [form, setForm] = useState({
    "name": ""
  })

  const handleGetCategory = async () => {
    let foundCategory = await getCategory(slug)
    foundCategory = foundCategory.data.data.category
    setCategory(foundCategory)
    setForm(foundCategory)
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()

    const category = await updateCategory(slug, form)
    router.push("/categories")
  }

  useEffect(() => {
    handleGetCategory(slug)
  }, [])

  return (
    <MainLayout
      title="Tambah Kategori Baru"
      content={
        <>
          <div class="row">
            <div class="col-md-8">
              <div class="card shadow-sm border-0">
                <div class="card-body">
                  <form onSubmit={(e) => handleUpdateCategory(e)}>
                    <div class="mb-3">
                      <label for="name" class="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" class="form-control p-3" id="name" name="name" value={form.name} onChange={(e) => setForm({"name": e.target.value})} autofocus required />
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