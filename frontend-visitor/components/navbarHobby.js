import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Roller } from "react-awesome-spinners";
import { default_categories } from "../helpers/constants";
import { getCategories } from "../pages/api/category";
import LoginButton from "./loginButton";

export default function NavbarHobby() {
  const [categories, setCategories] = useState([default_categories]);
  const [loading, setLoading] = useState(true);

  const handleGetCategories = async () => {
    await getCategories().then(data => {
      setCategories(data.data.data.categories);
    }).catch(err => {
      console.log(err);
    });
  }

  const renderCategories = () => {
    if (loading === true) {
      return (
        <div className="text-center">
          <Roller color="black" />
        </div>
      )
    } else {
      return (
        categories.map((category, idx) => {
          return (
            <li key={idx}>
              <Link href={`/hobbies/category/${category.slug}`}>
                <a className="dropdown-item">{category.name}</a>
              </Link>
            </li>
          );
        })
      )
    }
  }

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    if (categories[0].name !== "category") {
      setLoading(false);
    }
  }, [categories]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top border-bottom sticky-top bg-white">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">
            <Image src="/img/logo.webp" width={35} height={35} alt="Logo Find My Hobby" />
          </a>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <div className="nav-menu">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex align-items-center justify-content-between">
            <div className="dropdown">
              <button className="bg-transparent border-0 dropdown-toggle nav-link fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag me-1" viewBox="0 0 16 16">
                  <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                  <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
                </svg>
                Kategori
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {renderCategories()}
              </ul>
            </div>
            <Link href="/cari-acak">
              <a className="nav-link fw-bold ms-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shuffle me-1" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
                  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
                </svg>
                Cari Acak
              </a>
            </Link>
            <LoginButton />
          </div>
        </div>
      </div>
    </nav>
  )
}