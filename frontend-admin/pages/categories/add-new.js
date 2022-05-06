import Title from "../../components/title";
import MainLayout from "../../layouts/main";


export default function AddNew() {
  return (
    <MainLayout
      title="Tambah Kategori Baru"
      content={
        <>
          <div class="row">
            <div class="col-md-8">
              <div class="card shadow-sm border-0">
                <div class="card-body">
                  <form action="/products/add-new" method="POST" enctype="multipart/form-data">
                    <div class="mb-3">
                      <label for="name" class="form-label small mb-1 text-capitalize">nama</label>
                      <input type="text" class="form-control p-3" id="name" name="name" value="" autofocus required />
                    </div>
                    <div className="mb-3">
                      <label class="text-muted" for="description"><small>Deskripsi</small></label>
                      <textarea class="form-control" id="description" name="description" rows="15" required></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="unit" class="form-label small mb-1 text-capitalize">kategori</label>
                      <select class="form-select p-3" aria-label="Default select example" id="unit" name="unit" required>
                        <option value="" selected>-- Pilih Kategori --</option>
                        <option value="{{ $unit->id }}">Nama Kategori</option>
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