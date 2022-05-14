import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notification from "../../components/notification";
import { ALERT_FAILED, ALERT_SUCCESS } from "../../constants/alertStyles";
import { TIMEOUT, TIMEOUT_HALF_A_SECOND, TIMEOUT_LONG } from "../../constants/timeout";
import MainLayout from "../../layouts/main";
import { deleteCategory, getCategories, getCategoriesByName } from "../api/category";


export default function Index() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)
  const [notification, setNotification] = useState(null)

  const renderNotification = (color, message) => {
    setNotification(
      <Notification 
        color={color}
        message={message}
      />
    )
    setTimeout(() => {
      setNotification("")
    }, TIMEOUT_LONG)
  }

  const handleGetCategories = async () => {
    const foundCategories = await getCategories()
    const total = foundCategories.data.data.total
    foundCategories = foundCategories.data.data.categories
    setCategories(foundCategories)
    setTotal(total)
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
                {category.name || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
              {moment(category.createdAt).fromNow() || <small className="text-muted">[Kosong]</small>}
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

  const handleFilterCategories = async (name) => {
    let foundCategories = await getCategoriesByName(name)
    const total = foundCategories.data.data.total
    foundCategories = foundCategories.data.data.categories
    setCategories(foundCategories)
    setTotal(total)
  }

  const handleDelete = async (e, slug = "") => {
    e.preventDefault()
    
    try {
      const isConfirmed = confirm("Yakin ingin menghapus?")
      if (isConfirmed) {
        const category = await deleteCategory(slug)
        renderNotification(ALERT_SUCCESS, category.data.message)
        setTimeout(() => {
          handleGetCategories()
        }, TIMEOUT)
      }
    } catch (err) {
      renderNotification(ALERT_FAILED, err.message)
    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  return (
    <>
      <MainLayout 
        title="Tampil Kategori"
        notification={notification}
        content={
          <>
            <Link href="/categories/add-new">
              <a className="btn btn-salmon fw-bold mb-3">Tambah Baru</a>
            </Link>
            <div className="container-fluid mb-2">
              <div className="row">
                <div className="col-md-6 col-lg-3">
                  <label>Cari Kategori</label>
                  <div className="d-flex">
                    <input type="text" className="form-control me-2" onChange={(e) => {
                      setTimeout(() => {
                        if (e.target.value !== "") {
                          handleFilterCategories(e.target.value);
                        } else {
                          handleGetCategories();
                        }
                      }, TIMEOUT_HALF_A_SECOND)
                    }} />
                    <button className="btn btn-salmon" title="Refresh data" onClick={(e) => handleGetCategories()}><i className="bi bi-arrow-clockwise"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md">
                  <div className="table-responsive">
                    <p>Total: <b>{total}</b> Data Ditemukan</p>
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