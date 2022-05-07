import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main";
import { deleteCategory, getCategories } from "../api/category";


export default function Index() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleGetCategories = async () => {
    const foundCategories = await getCategories()
    setCategories(foundCategories.data.data.categories)
  }

  const renderTableData = () => {
    if (categories.length < 1) {
      return (
        <tr>
          <td colSpan={4}>Data empty.</td>
        </tr>
      )
    } else {
      return (
        categories.map((category, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i+1}.</th>
              <td>
                {category.name}
              </td>
              <td>
              {moment(category.createdAt).fromNow()}
              </td>
              <td className="d-flex justify-content-center">
                <Link href={`/categories/edit/${category.slug}`}>
                  <a className="btn btn-warning me-2"><span className="bi bi-pencil-fill"></span> Ubah</a>
                </Link>
                <form onSubmit={(e) => handleDelete(e, category.slug)}>
                  <button type="submit" className="btn btn-outline-danger"><span className="bi bi-trash-fill"></span> Hapus</button>
                </form>
              </td>
            </tr>
          )
        })
      )
    }
  }

  const filterCategories = (term) => {
    // Do something.
  }

  const handleDelete = async (e, slug = "") => {
    e.preventDefault()

    const category = await deleteCategory(slug)
    router.reload()
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  return (
    <>
      <MainLayout 
        title="Tampil Kategori"
        content={
          <>
            <div className="container-fluid mb-2">
              <div className="row">
                <div className="col-md-3">
                  <label>Cari Kategori</label>
                  <input type="text" className="form-control" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped text-center">
                      <thead className="thead-dark">
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
                      <tfoot className="tfoot-dark">
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