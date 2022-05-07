import { useRouter } from "next/router";
import { useState } from "react";
import Title from "../../components/title";
import MainLayout from "../../layouts/main";
import { createCategory } from "../api/category";


export default function AddNew() {
  const router = useRouter()
  const [form, setForm] = useState({
    "name": ""
  })

  const handleCreateNewCategory = async (e) => {
    e.preventDefault()

    const category = await createCategory(form)
    router.push("/categories")
  }

  return (
    <MainLayout
      title="Tambah Kategori Baru"
      content={
        <>
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => handleCreateNewCategory(e)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" className="form-control p-3" id="name" name="name" onChange={(e) => setForm({"name": e.target.value})} autoFocus required />
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