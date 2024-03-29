import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/main"
import moment from 'moment'
import { deleteHobby, getHobbies, getHobbiesByName } from "../api/hobby"
import { useRouter } from "next/router"
import { TIMEOUT_HALF_A_SECOND } from "../../constants/timeout"
import notificationWarning from "../../helpers/notificationWarning"
import notificationSuccess from "../../helpers/notificationSuccess"
import notificationFailed from "../../helpers/notificationFailed"
import domain from "../../constants/domain"


export default function Index() {
  const [hobbies, setHobbies] = useState([])
  const [total, setTotal] = useState(0)
  const router = useRouter()

  const handleGetHobbies = async () => {
    let foundHobbies = await getHobbies()
    const total = foundHobbies.data.data.total
    foundHobbies = foundHobbies.data.data.hobbies
    setHobbies(foundHobbies)
    setTotal(total)
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
          let imgSrc = "";
          if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
            imgSrc = hobby.img !== "" ? `${domain}/getFile/${hobby.img}` : "/img/default.jpg"
          } else {
            imgSrc = hobby.img !== "" ? `https://ucarecdn.com/${hobby.img}/-/preview/48x48/` : "/img/default.jpg"
          }
          
          return (
            <tr key={i}>
              <th scope="row">{i+1}.</th>
              <td>
                <a href={imgSrc}>
                  <img src={imgSrc} width={48} height={48} />
                </a>
              </td>
              <td>
                {hobby.name || <small className="text-muted">[Kosong]</small>}
              </td>
              <td className="post-body">{hobby.description.substring(0, 100) + "..." || <small className="text-muted">[Kosong]</small>}</td>
              <td>{hobby.visited_count + " kali" || <small className="text-muted">[Kosong]</small>}</td>
              <td>
                {hobby.category || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {hobby.community_link ? <a className="text-decoration-none fw-bold" href={hobby.community_link}>{hobby.community_name}</a> : <small className="text-muted">[Kosong]</small>}
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
    const total = foundHobbies.data.data.total
    foundHobbies = foundHobbies.data.data.hobbies
    setHobbies(foundHobbies)
    setTotal(total)
  }

  const handleDelete = async (e, slug = "") => {
    e.preventDefault()

    try {
      const isConfirmed = await notificationWarning({
        title: "Yakin ingin menghapus?"
      })
      if (isConfirmed) {
        const result = await deleteHobby(slug)
        notificationSuccess({
          message: result.data.message
        })
        handleGetHobbies()
      }
    } catch (err) {
      notificationFailed({
        message: err.message
      })
    }
  }

  return (
    <>
      <MainLayout
        title="Tampil Hobi"
        content={
          <>
            <Link href="/hobbies/add-new">
              <a className="btn btn-salmon fw-bold mb-3">Tambah Baru</a>
            </Link>
            <div className="container-fluid mb-2">
              <div className="row">
                <div className="col-md-6 col-lg-3">
                  <label>Cari Hobi</label>
                  <div className="d-flex">
                    <input type="text" className="form-control me-2" onChange={(e) => {
                      setTimeout(() => {
                        if (e.target.value !== "") {
                          handleFilterHobby(e.target.value);
                        } else {
                          handleGetHobbies();
                        }
                      }, TIMEOUT_HALF_A_SECOND)
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
                    <p>Total: <b>{total}</b> Data Ditemukan</p>
                    <table className="table table-bordered table-striped text-center">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Gambar</th>
                          <th scope="col">Judul</th>
                          <th scope="col">Deskripsi</th>
                          <th scope="col">Dilihat</th>
                          <th scope="col">Kategori</th>
                          <th scope="col">Link Komunitas</th>
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
                          <th scope="col">Gambar</th>
                          <th scope="col">Judul</th>
                          <th scope="col">Deskripsi</th>
                          <th scope="col">Dilihat</th>
                          <th scope="col">Kategori</th>
                          <th scope="col">Link Komunitas</th>
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