import Link from "next/link"
import { useEffect, useState } from "react"
import MainLayout from "../../layouts/main"
import moment from 'moment'
import { getHobbies } from "../api/hobby"


export default function Index() {
  const placeholderHobbies = [
    {
      "name": "Programming",
      "slug": "coding",
      "description": "Membuat program komputer.",
      "category": "teknologi",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Mendaki Gunung",
      "slug": "mendaki-gunung",
      "description": "Mendaki berbagai gunung yang indah.",
      "category": "lainnya",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Menulis",
      "slug": "menulis",
      "description": "Membuat buku, novel, cerpen, dan lain sebagainya.",
      "category": "sastra",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Programming",
      "slug": "coding",
      "description": "Membuat program komputer.",
      "category": "teknologi",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Mendaki Gunung",
      "slug": "mendaki-gunung",
      "description": "Mendaki berbagai gunung yang indah.",
      "category": "lainnya",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Menulis",
      "slug": "menulis",
      "description": "Membuat buku, novel, cerpen, dan lain sebagainya.",
      "category": "sastra",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Programming",
      "slug": "coding",
      "description": "Membuat program komputer.",
      "category": "teknologi",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Mendaki Gunung",
      "slug": "mendaki-gunung",
      "description": "Mendaki berbagai gunung yang indah.",
      "category": "lainnya",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Menulis",
      "slug": "menulis",
      "description": "Membuat buku, novel, cerpen, dan lain sebagainya.",
      "category": "sastra",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Programming",
      "slug": "coding",
      "description": "Membuat program komputer.",
      "category": "teknologi",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Mendaki Gunung",
      "slug": "mendaki-gunung",
      "description": "Mendaki berbagai gunung yang indah.",
      "category": "lainnya",
      "createdAt": "6 Mei 2022"
    },
    {
      "name": "Menulis",
      "slug": "menulis",
      "description": "Membuat buku, novel, cerpen, dan lain sebagainya.",
      "category": "sastra",
      "createdAt": "6 Mei 2022"
    },
  ]
  const [hobbies, setHobbies] = useState(placeholderHobbies)
  const [searchTerm, setSearchTerm] = useState("")

  const handleGetHobbies = async () => {
    const foundHobbies = await getHobbies()
    console.log(foundHobbies)
    setHobbies(foundHobbies.data.data.hobbies)
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
            <tr>
              <th scope="row">{i+1}.</th>
              <td>
                {hobby.name}
              </td>
              <td className="post-body">{hobby.description}</td>
              <td>
              {hobby.category}
              </td>
              <td>
              {moment(hobby.createdAt).fromNow()}
              </td>
              <td className="d-flex justify-content-center">
                <Link href={`/hobbies/${hobby.slug}/edit`}>
                  <a className="btn btn-warning me-2"><span className="bi bi-pencil-fill"></span> Ubah</a>
                </Link>
                <form onSubmit={(e) => handleDelete(e)}>
                  <button type="submit" className="btn btn-outline-danger"><span className="bi bi-trash-fill" value={hobby.slug}></span> Hapus</button>
                </form>
              </td>
            </tr>
          )
        })
      )
    }
  }

  const filterHobbies = (term) => {
    // Do something.
  }

  const handleDelete = (e) => {
    e.preventDefault()
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