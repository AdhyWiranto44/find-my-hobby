import { useEffect, useState } from 'react'
import { getHobbies } from './api/hobby';
import { getCategories } from './api/category';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HobbyItem from '../components/hobbyItem';
import CategoryItem from '../components/categoryItem';
import SearchBar from '../components/searchBar';
import { useRouter } from 'next/router';
import { Roller } from 'react-awesome-spinners';
import { default_categories, default_hobby } from '../helpers/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [hobbies, setHobbies] = useState([default_hobby]);
  const [categories, setCategories] = useState([default_categories]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleFilterHobby = (e, term = "") => {
    e.preventDefault();
    router.push(`/hobbies?search=${term}`);
  }

  const renderHobbies = () => {
    if (loading === true) {
      return (
        <div className="text-center">
          <Roller color="black" />
        </div>
      );
    } else {
      return (
        hobbies.sort((a, b) => {
          if (a.visited_count > b.visited_count) {
            return -1;
          } else {
            return 1;
          }
          return 0;
        }).map((hobby, idx) => {
          if (idx < 4) {
            return (
              <HobbyItem
                key={idx}
                hobby={hobby}
              />
            );
          }
        })
      )
    }
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
            <CategoryItem
              key={idx}
              category={category}
            />
          );
        })
      )
    }
  }

  const renderMoreButton = () => {
    if (loading !== true) {
      return (
        <div className="row mt-3">
          <div className="col-md text-center">
            <Link href="/hobbies">
              <a className="btn btn-outline-danger" style={{ borderRadius: "15px" }}>Lebih banyak</a>
            </Link>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    handleGetHobbies();
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    if (hobbies[0].name !== "name" && categories[0].name) {
      setLoading(false);
    }
  }, [hobbies, categories]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div id='jumbotron' className="container mt-3">
        <div className='row d-flex align-items-center'>
          <div className='col-md-6 py-3 order-2 order-md-1'>
            <small>Cari Kegemaranmu <div className='d-inline border-bottom border-4 border-warning fw-bold'>sekarang!</div></small>
            <h1 className='display-4 fw-bold mb-4'>Find My Hobby</h1>
            <SearchBar 
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => handleFilterHobby(e, searchTerm)}
                onKeyUp={(e) => e.key == "Enter" && handleFilterHobby(e, searchTerm)}
              />
              <small className="d-block mt-4">Atau ingin berkontribusi? <Link href={"/saran-hobi"}>
                  <a className="btn-sm btn-warning text-decoration-none rounded-pill">kirim ke sini</a>
                </Link>
              </small>
          </div>
          <div className='col-md-6 order-1 order-md-2 d-flex justify-content-center'>
          <img className='w-75 rounded-circle' src="/img/illustration.jpg" alt="Just an illustration" />
          </div>
        </div>
      </div>

      <div id="rekomendasi" className="container">
        <div className="row mt-5 mb-3">
          <div className="col-md">
            <small className="fw-bold text-secondary d-block mb-2">Temukan <div className='d-inline border-bottom border-warning border-4'>hal baru</div></small>
            <h4 className="fw-bold">Rekomendasi Hobi</h4>
          </div>
        </div>
        <div className="row">
          {renderHobbies()}
        </div>
        {renderMoreButton()}
      </div>

      <div id="kategori" className="container">
        <div className="row mt-5 mb-3">
          <div className="col-md">
            <small className="fw-bold text-secondary d-block mb-2">Temukan <div className='d-inline border-bottom border-warning border-4'><i>circle</i>-mu</div></small>
            <h4 className="fw-bold">Daftar Kategori</h4>
          </div>
        </div>
        <div className="row mb-5">
          {renderCategories()}
        </div>
      </div>

      <Footer />
    </div>
  )
}
