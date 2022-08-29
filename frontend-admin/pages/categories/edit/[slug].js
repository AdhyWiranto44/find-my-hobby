import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import notificationFailed from "../../../helpers/notificationFailed";
import notificationSuccess from "../../../helpers/notificationSuccess";
import MainLayout from "../../../layouts/main";
import { getCategory, updateCategory } from "../../api/category";


export default function Edit() {
  const router = useRouter()
  const [category, setCategory] = useState({})
  const slug = router.query.slug
  const [form, setForm] = useState({
    "name": ""
  })

  const handleGetCategory = useCallback( async () => {
    let foundCategory = await getCategory(slug)
    foundCategory = foundCategory.data.data.category
    setCategory(foundCategory)
    setForm(foundCategory)
  }, [slug])

  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    try {
      const category = await updateCategory(slug, form)
      notificationSuccess({
        message: category.data.message
      })
      router.push("/categories")
    } catch (err) {
      notificationFailed({
        message: err.response.data.message
      })
    }
  }

  useEffect(() => {
    handleGetCategory(slug)
  }, [handleGetCategory, slug])

  return (
    <MainLayout
      title="Ubah Kategori"
      content={
        <>
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => handleUpdateCategory(e)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" className="form-control p-3" id="name" name="name" value={form.name} onChange={(e) => setForm({"name": e.target.value})} autoFocus required />
                    </div>
                    <div className="row gx-3">
                      <div className="col-sm-2">
                        <Link href="/categories">
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