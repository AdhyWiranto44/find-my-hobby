import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notification from "../../components/notification";
import { ALERT_FAILED, ALERT_SUCCESS } from "../../constants/alertStyles";
import { TIMEOUT, TIMEOUT_HALF_A_SECOND, TIMEOUT_LONG } from "../../constants/timeout";
import MainLayout from "../../layouts/main";
import { deleteRole, getRoles, getRolesByName } from "../api/role";


export default function Index() {
  const router = useRouter()
  const [roles, setRoles] = useState([])
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

  const handleGetRoles = async () => {
    const foundRoles = await getRoles()
    const total = foundRoles.data.data.total
    foundRoles = foundRoles.data.data.roles
    setRoles(foundRoles)
    setTotal(total)
  }

  const renderTableData = () => {
    if (roles.length < 1) {
      return (
        <tr>
          <td colSpan={4}>Data empty.</td>
        </tr>
      )
    } else {
      return (
        roles.map((role, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i+1}.</th>
              <td>
                {role.name || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
              {moment(role.createdAt).fromNow() || <small className="text-muted">[Kosong]</small>}
              </td>
              <td className="d-flex justify-content-center">
                <Link href={`/roles/edit/${role.slug}`}>
                  <a className="btn btn-warning me-2"><span className="bi bi-pencil-fill"></span> Ubah</a>
                </Link>
                <form onSubmit={(e) => handleDelete(e, role.slug)}>
                  <button type="submit" className="btn btn-outline-danger"><span className="bi bi-trash-fill"></span> Hapus</button>
                </form>
              </td>
            </tr>
          )
        })
      )
    }
  }

  const handleFilterRoles = async (name) => {
    let foundRoles = await getRolesByName(name)
    const total = foundRoles.data.data.total
    foundRoles = foundRoles.data.data.roles
    setRoles(foundRoles)
    setTotal(total)
  }

  const handleDelete = async (e, slug = "") => {
    e.preventDefault()
    
    try {
      const isConfirmed = confirm("Yakin ingin menghapus?")
      if (isConfirmed) {
        const role = await deleteRole(slug)
        renderNotification(ALERT_SUCCESS, role.data.message)
        setTimeout(() => {
          handleGetRoles()
        }, TIMEOUT)
      }
    } catch (err) {
      renderNotification(ALERT_FAILED, err.message)
    }
  }

  useEffect(() => {
    handleGetRoles()
  }, [])

  return (
    <>
      <MainLayout 
        title="Tampil Hak Akses"
        notification={notification}
        content={
          <>
            <Link href="/roles/add-new">
              <a className="btn btn-salmon fw-bold mb-3">Tambah Baru</a>
            </Link>
            <div className="container-fluid mb-2">
              <div className="row">
                <div className="col-md-6 col-lg-3">
                  <label>Cari Hak Akses</label>
                  <div className="d-flex">
                    <input type="text" className="form-control me-2" onChange={(e) => {
                      setTimeout(() => {
                        if (e.target.value !== "") {
                          handleFilterRoles(e.target.value);
                        } else {
                          handleGetRoles();
                        }
                      }, TIMEOUT_HALF_A_SECOND)
                    }} />
                    <button className="btn btn-salmon" title="Refresh data" onClick={(e) => handleGetRoles()}><i className="bi bi-arrow-clockwise"></i></button>
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