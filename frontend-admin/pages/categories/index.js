import Link from "next/link";
import { useState } from "react";
import MainLayout from "../../layouts/main";


export default function Index() {
  const placeholderCategories = [
    {
      "name": "Kategori 1",
      "slug": "kategori-1",
      "createdAt": "tadi"
    },
    {
      "name": "Kategori 2",
      "slug": "kategori-2",
      "createdAt": "tadi"
    },
    {
      "name": "Kategori 3",
      "slug": "kategori-3",
      "createdAt": "tadi"
    },
  ]
  const [categories, setCategories] = useState(placeholderCategories)
  const [searchTerm, setSearchTerm] = useState("")

  const renderTableData = () => {
    return (
      categories.map((category, i) => {
        return (
          <tr>
            <th scope="row">{i+1}</th>
            <td>
              {category.name}
            </td>
            <td>
            {category.createdAt}
            </td>
            <td class="d-flex justify-content-center">
              <Link href={`/categories/${category.slug}/edit`}>
                <a class="btn btn-warning me-2"><span class="bi bi-pencil-fill"></span> Ubah</a>
              </Link>
              <form onSubmit={(e) => handleDelete(e)}>
                <button type="submit" class="btn btn-outline-danger"><span class="bi bi-trash-fill" value={category.slug}></span> Hapus</button>
              </form>
            </td>
          </tr>
        )
      })
    )
  }

  const filterCategories = (term) => {
    // Do something.
  }

  const handleDelete = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <MainLayout 
        title="Tampil Kategori"
        content={
          <>
            <div className="container mb-2">
              <div className="row">
                <div className="col-md-3">
                  <label>Cari Kategori</label>
                  <input type="text" className="form-control" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md">
                  <div className="table-responsive">
                    <table class="table table-bordered table-striped text-center">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Ditambahkan</th>
                          <th scope="col">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderTableData()}
                      </tbody>
                      <tfoot class="tfoot-dark">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Ditambahkan</th>
                          <th scope="col">Aksi</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  )
}