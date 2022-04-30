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

  useEffect(() => {
    handleGetHobbies();
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  return (
    <>
      <Navbar />

      <div id="welcome" className="container-fluid bg-warning">
        <div className="container">
          <div className="row text-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 offset-sm-1 offset-md-2 offset-lg-3">
              <h1 className="fw-bold text-light"><span className="text-warning">Find</span> My <u style={{textDecorationColor: "#FFC107"}}>Hobby</u></h1>
              <p className="text-light mb-4">Cari kegemaranmu sekarang!</p>
              <SearchBar 
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => handleFilterHobby(e, searchTerm)}
              />
            </div>
            <div className="col-lg-4 offset-lg-4 mt-3">
              <h6 className="text-light">Ingin berkontribusi? <Link href={"/saran-hobi"}>
                  <a className="btn-sm btn-warning text-decoration-none rounded-pill">kirim ke sini</a>
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div id="rekomendasi" className="container">
        <div className="row mt-5 mb-3">
          <div className="col-md">
            <small className="fw-bold text-secondary d-block mb-2">Temukan hal baru</small>
            <h4 className="fw-bold"><u style={{textDecorationColor: "#FFC107"}}>Rekomendasi Hobi</u></h4>
          </div>
        </div>
        <div className="row">
          {renderHobbies()}
        </div>
        <div className="row mt-3">
          <div className="col-md text-center">
            <Link href="/hobbies">
              <a className="btn btn-outline-danger" style={{ borderRadius: "15px" }}>Lebih banyak</a>
            </Link>
          </div>
        </div>
      </div>

      <div id="kategori" className="container">
        <div className="row mt-5 mb-3">
          <div className="col-md">
            <small className="fw-bold text-secondary d-block mb-2">Temukan <i>circle</i>-mu</small>
            <h4 className="fw-bold"><u style={{textDecorationColor: "#FFC107"}}>Daftar Kategori</u></h4>
          </div>
        </div>
        <div className="row mb-5">
          {renderCategories()}
        </div>
      </div>

      <Footer />
    </>
  )
}
