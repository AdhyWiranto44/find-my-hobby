import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TIMEOUT_HALF_A_SECOND } from "../../constants/timeout";
import MainLayout from "../../layouts/main";
import { deleteUser, getUsers, getUsersByUsername } from "../api/user";


export default function Index() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const handleGetUsers = async () => {
    const foundUsers = await getUsers()
    const total = foundUsers.data.data.total
    foundUsers = foundUsers.data.data.users
    setUsers(foundUsers)
    setTotal(total)
  }

  const renderTableData = () => {
    if (users.length < 1) {
      return (
        <tr>
          <td colSpan={4}>Data empty.</td>
        </tr>
      )
    } else {
      return (
        users.map((user, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}.</th>
              <td>
                {user.username || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {moment(user.createdAt).fromNow() || <small className="text-muted">[Kosong]</small>}
              </td>
              <td className="d-flex justify-content-center">
                <Link href={`/users/edit/${user.username}`}>
                  <a className="btn btn-warning me-2"><span className="bi bi-pencil-fill"></span> Ubah</a>
                </Link>
                <form onSubmit={(e) => handleDelete(e, user.username)}>
                  <button type="submit" className="btn btn-outline-danger"><span className="bi bi-trash-fill"></span> Hapus</button>
                </form>
              </td>
            </tr>
          )
        })
      )
    }
  }

  const handleFilterUsers = async (username) => {
    let foundUsers = await getUsersByUsername(username)
    const total = foundUsers.data.data.total
    foundUsers = foundUsers.data.data.users
    setUsers(foundUsers)
    setTotal(total)
  }

  const handleDelete = async (e, username = "") => {
    e.preventDefault()
    const isConfirmed = confirm("Yakin ingin menghapus?")
    if (isConfirmed) {
      const user = await deleteUser(username)
      router.reload()
    }
  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  return (
    <>
      <MainLayout
        title="Tampil Pengguna"
        content={
          <>
            <Link href="/users/add-new">
              <a className="btn btn-salmon fw-bold mb-3">Tambah Baru</a>
            </Link>
            <div className="container-fluid mb-2">
              <div className="row">
                <div className="col-md-6 col-lg-3">
                  <label>Cari Pengguna</label>
                  <div className="d-flex">
                    <input type="text" className="form-control me-2" onChange={(e) => {
                      setTimeout(() => {
                        if (e.target.value !== "") {
                          handleFilterUsers(e.target.value);
                        } else {
                          handleGetUsers();
                        }
                      }, TIMEOUT_HALF_A_SECOND)
                    }} />
                    <button className="btn btn-salmon" title="Refresh data" onClick={(e) => handleGetUsers()}><i className="bi bi-arrow-clockwise"></i></button>
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
                          <th scope="col">Username</th>
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
                          <th scope="col">Username</th>
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