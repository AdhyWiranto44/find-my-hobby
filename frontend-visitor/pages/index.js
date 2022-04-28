import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getHobbies } from '../api/hobby';
import { getCategories } from '../api/category';
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';

export default function Home() {
  const [hobbies, setHobbies] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleGetHobbies = async () => {
    await getHobbies().then(data => {
      setHobbies(data.data.data.hobbies);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleGetCategories = async () => {
    await getCategories().then(data => {
      setCategories(data.data.data.categories);
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    handleGetHobbies();
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <>
      <Navbar />

      <div id="welcome" class="container-fluid bg-warning">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 pb-5">
              <h1 class="fw-bold text-light">Find My Hobby</h1>
              <p class="text-light">Cari kegemaranmu sekarang!</p>
              <form action="/search" method="GET" class="d-flex bg-white p-3 shadow mt-4">
                <input type="text" class="form-control border-0" id="title" name="title" placeholder="contoh: Menulis" autofocus />
                <button type="submit" class="btn btn-danger border-0">Cari</button>
              </form>
            </div>
            <div class="col-lg-4 mx-auto">
              <h3 class="fw-bold text-light">Ingin berkontribusi?</h3>
              <p class="text-light">Silakan menambahkan saran hobi untuk kami</p>
              <a class="btn btn-lg btn-warning fw-bold" href="/saran-hobi">Beri saran sekarang</a>
            </div>
          </div>
        </div>
      </div>

      <div id="rekomendasi" class="container">
        <div class="row mt-5 mb-3">
          <div class="col-md">
            <h4 class="fw-bold">Rekomendasi Hobi</h4>
          </div>
        </div>
        <div class="row">
          {
            hobbies.map(hobby => {
              return (
                <div class="col-12 col-md-4 col-lg-3">
                  <Link href={`/hobby/${hobby.slug}`}>
                    <a>
                      <div class="card bg-dark text-white border-0 shadow overflow-hidden mb-4">
                        <img src="/img/hobi.webp" class="card-img w-100" alt="rekomendasi hobi" />
                        <div class="card-img-overlay d-flex">
                          <div class="mt-auto">
                            <h5 class="card-title fw-bold">{hobby.name}</h5>
                            <p class="card-text text-justify">{hobby.description.substring(0, 30)}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </div>

      <div id="kategori" class="container">
        <div class="row mt-5 mb-3">
          <div class="col-md">
            <h4 class="fw-bold">Daftar Kategori</h4>
          </div>
        </div>
        <div class="row mb-5">
          {
            categories.map(category => {
              return (
                <div class="col-12 col-md-4 col-lg-3">
                  <a class=" text-decoration-none text-dark" href={`/category/${category.slug}`}>
                    <div class="card bg-light shadow border-0 mb-4">
                      <div class="card-body text-center pb-2">
                          <h6 class="card-title">{category.name}</h6>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>

      <Footer />
    </>
  )
}
