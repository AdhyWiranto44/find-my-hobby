import { useEffect, useState } from 'react'
import MainLayout from '../layouts/main'
import { getCategories } from './api/category'
import { getHobbies } from './api/hobby'
import { getSuggestions } from './api/suggestions'
import Link from 'next/link'


export default function Home() {
  const [hobbies, setHobbies] = useState([])
  const [categories, setCategories] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const handleGetHobbies = async () => {
    let foundHobbies = await getHobbies()
    foundHobbies = foundHobbies.data.data.hobbies
    setHobbies(foundHobbies)
  }

  const handleGetCategories = async () => {
    let foundCategories = await getCategories()
    foundCategories = foundCategories.data.data.categories
    setCategories(foundCategories)
  }

  const handleGetSuggestions = async () => {
    let foundSuggestions = await getSuggestions()
    foundSuggestions = foundSuggestions.data.data.suggestions
    setSuggestions(foundSuggestions)
  }

  useEffect(() => {
    handleGetHobbies()
  }, [])

  useEffect(() => {
    handleGetCategories()
  }, [])

  useEffect(() => {
    handleGetSuggestions()
  }, [])

  return (
    <MainLayout
      title="Dashboard"
      content={
        <>
          <div className="row mt-3">
            <div className="col-lg-4">
              <div className="card p-2 border-0 shadow mb-3">
                <div className="card-body text-center">
                  <div className="d-flex align-items-between justify-content-center">
                    <i className="bi bi-card-list me-2 h4 text-salmon"></i>
                    <h5 className="fw-bold mb-0">Hobi</h5>
                  </div>
                  <h3 className="py-3">{hobbies.length}</h3>
                    <Link href="/hobbies">
                      <a className=" btn btn-light px-3 text-decoration-none text-secondary"><small>Detail</small></a>
                    </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card p-2 border-0 shadow mb-3">
                <div className="card-body text-center">
                  <div className="d-flex align-items-between justify-content-center">
                    <i className="bi bi-card-list me-2 h4 text-salmon"></i>
                    <h5 className="fw-bold mb-0">Kategori</h5>
                  </div>
                  <h3 className="py-3">{categories.length}</h3>
                    <Link href="/categories">
                      <a className=" btn btn-light px-3 text-decoration-none text-secondary"><small>Detail</small></a>
                    </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card p-2 border-0 shadow mb-3">
                <div className="card-body text-center">
                  <div className="d-flex align-items-between justify-content-center">
                    <i className="bi bi-card-list me-2 h4 text-salmon"></i>
                    <h5 className="fw-bold mb-0">Saran Hobi</h5>
                  </div>
                  <h3 className="py-3">{suggestions.length}</h3>
                    <Link href="/suggestions">
                      <a className=" btn btn-light px-3 text-decoration-none text-secondary"><small>Detail</small></a>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}
