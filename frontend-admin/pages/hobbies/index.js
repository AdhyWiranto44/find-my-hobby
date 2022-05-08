import Link from "next/link"
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/main"
import moment from 'moment'
import { deleteHobby, getHobbies, getHobbiesByName } from "../api/hobby"
import { useRouter } from "next/router"


export default function Index() {
  const [hobbies, setHobbies] = useState([])
  const router = useRouter()

  const handleGetHobbies = async () => {
    let foundHobbies = await getHobbies()
    foundHobbies = foundHobbies.data.data.hobbies
    setHobbies(foundHobbies)
  }

  useEffect(() => {
    handleGetHobbies()
  }, [])

  const renderTableData = () => {
    if (hobbies.length < 1) {
      return (
        <tr>
          <td colSpan={6}>Data empty.</td>
        </tr>
      )
    } else {
      return (
        hobbies.map((hobby, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i+1}.</th>
              <td>
                {hobby.name || <small className="text-muted">[Kosong]</small>}
              </td>
              <td className="post-body">{hobby.description || <small className="text-muted">[Kosong]</small>}</td>
              <td>
              {hobby.category || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
              {moment(hobby.createdAt).fromNow() || <small className="text-muted">[Kosong]</small>}
              </td>
              <td className="d-flex justify-content-center">
                <Link href={`/hobbies/edit/${hobby.slug}`}>
                  <a className="btn btn-warning me-2"><span className="bi bi-pencil-fill"></span> Ubah</a>
                </Link>
                <form onSubmit={(e) => handleDelete(e, hobby.slug)}>
                  <button type="submit" className="btn btn-outline-danger"><span className="bi bi-trash-fill"></span> Hapus</button>
                </form>
              </td>
            </tr>
          )
        })
      )
    }
  }

  const handleFilterHobby = async (name) => {
    let foundHobbies = await getHobbiesByName(name)
    foundHobbies = foundHobbies.data.data.hobbies
    setHobbies(foundHobbies)
  }

  const handleDelete = async (e, slug = "") => {
    e.preventDefault()

    const result = await deleteHobby(slug)
    router.reload()
  }

  return (
    <>
      <MainLayout
        title="Tampil Hobi"
        content={
          <>
            <div className="container-fluid mb-2">
              <div className="row">
                <div className="col-md-3">
                  <label>Cari Hobi</label>
                  <div className="d-flex">
                    <input type="text" className="form-control me-2" onChange={(e) => {
                      setTimeout(() => {
                        if (e.target.value !== "") {
                          handleFilterHobby(e.target.value);
                        } else {
                          handleGetHobbies();
                        }
                      }, 500)
                    }} />
                    <button className="btn btn-salmon" title="Refresh data" onClick={(e) => handleGetHobbies()}><i className="bi bi-arrow-clockwise"></i></button>
                  </div>
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
                          <th scope="col">Judul</th>
                          <th scope="col">Deskripsi</th>
                          <th scope="col">Kategori</th>
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
                          <th scope="col">Judul</th>
                          <th scope="col">Deskripsi</th>
                          <th scope="col">Kategori</th>
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