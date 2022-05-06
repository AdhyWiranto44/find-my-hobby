import Link from "next/link";
import { useState } from "react";
import MainLayout from "../../layouts/main";


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
            <div className="container mb-2">
              <div className="row">
                <div className="col-md-3">
                  <label>Cari Hobi</label>
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
                          <th scope="col">Judul</th>
                          <th scope="col">Deskripsi</th>
                          <th scope="col">Kategori</th>
                          <th scope="col">Ditambahkan</th>
                          <th scope="col">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          hobbies.map((hobby, i) => {
                            return (
                              <tr>
                                <th scope="row">{i+1}</th>
                                <td>
                                  {hobby.name}
                                </td>
                                <td class="post-body">{hobby.description}</td>
                                <td>
                                {hobby.category}
                                </td>
                                <td>
                                {hobby.createdAt}
                                </td>
                                <td class="d-flex justify-content-center">
                                  <Link href={`/hobbies/${hobby.slug}/edit`}>
                                    <a class="btn btn-warning me-2"><span class="bi bi-pencil-fill"></span> Ubah</a>
                                  </Link>
                                  <form onSubmit={(e) => handleDelete(e)}>
                                    <button type="submit" class="btn btn-outline-danger"><span class="bi bi-trash-fill" value={hobby.slug}></span> Hapus</button>
                                  </form>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                      <tfoot class="tfoot-dark">
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