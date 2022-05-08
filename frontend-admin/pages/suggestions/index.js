import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main";
import { deleteSuggestion, getSuggestions } from "../api/suggestions";


export default function Index() {
  const [suggestions, setSuggestions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleGetSuggestions = async () => {
    let foundSuggestions = await getSuggestions()
    foundSuggestions = foundSuggestions.data.data.suggestions
    setSuggestions(foundSuggestions)
  }

  const filterSuggestions = (term) => {
    // Do something.
  }

  const handleDelete = async (e, slug) => {
    e.preventDefault()

    const suggestion = await deleteSuggestion(slug)
    router.reload()
  }

  const renderTableData = () => {
    if (suggestions.length < 1) {
      return (
        <tr>
          <td colSpan={7}>Data empty.</td>
        </tr>
      )
    } else {
      return (
        suggestions.map((suggestion, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i+1}</th>
              <td>
                {suggestion.name || <small className="text-muted">[Kosong]</small>}
              </td>
              <td className="post-body">
                {suggestion.description || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {suggestion.category || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {suggestion.suggester_email || <small className="text-muted">[Kosong]</small>}
              </td>
              <td>
                {moment(suggestion.createdAt).fromNow() || <small className="text-muted">[Kosong]</small>}
              </td>
              <td className="d-flex justify-content-center">
                <form onSubmit={(e) => handleDelete(e, suggestion.slug)}>
                  <button type="submit" className="btn btn-outline-danger"><span className="bi bi-trash-fill"></span> Hapus</button>
                </form>
              </td>
            </tr>
          )
        })
      )
    }
  }

  useEffect(() => {
    handleGetSuggestions();
  }, [])

  return (
    <>
      <MainLayout
        title="Tampil Saran Hobi"
        content={
          <>
            <div className="container mb-2">
              <div className="row">
                <div className="col-md-3">
                  <label>Cari Saran Hobi</label>
                  <div className="d-flex">
                    <input type="text" className="form-control me-2" onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="btn btn-salmon" title="Refresh data" onClick={(e) => handleGetSuggestions()}><i class="bi bi-arrow-clockwise"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
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
                          <th scope="col">Disarankan Oleh</th>
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
                          <th scope="col">Disarankan Oleh</th>
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