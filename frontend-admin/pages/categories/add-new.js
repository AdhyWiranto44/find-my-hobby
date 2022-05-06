import { useState } from "react";
import Title from "../../components/title";
import MainLayout from "../../layouts/main";


export default function AddNew() {
  const [form, setForm] = useState({
    "name": ""
  })

  const handleCreateNewCategory = (e) => {
    e.preventDefault()
  }

  return (
    <MainLayout
      title="Tambah Kategori Baru"
      content={
        <>
          <div class="row">
            <div class="col-md-8">
              <div class="card shadow-sm border-0">
                <div class="card-body">
                  <form onSubmit={(e) => handleCreateNewCategory(e)}>
                    <div class="mb-3">
                      <label for="name" class="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" class="form-control p-3" id="name" name="name" value="" onChange={(e) => setForm({"name": e.target.value})} autofocus required />
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