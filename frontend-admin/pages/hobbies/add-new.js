import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import notificationFailed from "../../helpers/notificationFailed";
import notificationSuccess from "../../helpers/notificationSuccess";
import MainLayout from "../../layouts/main";
import { getCategories } from "../api/category";
import { uploadFile } from "../api/file";
import { createHobby } from "../api/hobby";


export default function AddNew() {
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const defaultForm = {
    "name": "",
    "description": "",
    "community_name": "",
    "community_link": "",
    "category": ""
  }
  const [form, setForm] = useState(defaultForm)

  const handleGetCategories = async () => {
    const foundCategories = await getCategories()
    setCategories(foundCategories.data.data.categories)
  }

  const handleCreateNewHobby = async () => {
    try {
      const hobby = await createHobby(form)

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

  useEffect(() => {
    handleGetCategories()
  }, [])

  return (
    <MainLayout
      title="Tambah Hobi Baru"
      content={
        <>
          <div className="row">
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateNewHobby();
                  }}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" className="form-control p-3" id="name" name="name" onChange={(e) => setForm({...form, "name": e.target.value})} autoFocus required />
                    </div>
                    <div className="mb-3">
                      <label className="text-muted" htmlFor="description"><small>Deskripsi</small></label>
                      <textarea className="form-control" id="description" name="description" rows="15" onChange={(e) => setForm({...form, "description": e.target.value})} required></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="community_name" className="form-label small mb-1 text-capitalize">nama komunitas</label>
                      <input type="text" className="form-control p-3" id="community_name" name="community_name" onChange={(e) => setForm({...form, "community_name": e.target.value})} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="community_link" className="form-label small mb-1 text-capitalize">link komunitas</label>
                      <input type="text" className="form-control p-3" id="community_link" name="community_link" onChange={(e) => setForm({...form, "community_link": e.target.value})} />
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
                    <div className="mb-3">
                      <label htmlFor="img" className="form-label small mb-1 text-capitalize">gambar</label>
                      <input type="file" className="form-control p-3" id="img" name="img" onChange={(e) => {
                        setForm({...form, "file": e.target.files[0]});
                      }} />
                    </div>
                    <div className="row gx-3">
                      <div className="col-sm-2">
                        <Link href="/hobbies">
                          <a className="btn btn-outline-secondary w-100 p-3 mt-3"><i className="bi bi-chevron-left"></i></a>
                        </Link>
                      </div>
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-salmon w-100 p-3 mt-3 fw-bold text-uppercase"><i className="bi bi-plus-circle me-2"></i> tambah</button>
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