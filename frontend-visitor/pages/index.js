import { useEffect, useState } from 'react'
import { getHobbies } from '../api/hobby';
import { getCategories } from '../api/category';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HobbyItem from '../components/hobbyItem';
import CategoryItem from '../components/categoryItem';
import SearchBar from '../components/searchBar';
import { useRouter } from 'next/router';
import { Roller } from 'react-awesome-spinners';
import { default_hobby } from '../helpers/constants';

export default function Home() {
  const [hobbies, setHobbies] = useState([default_hobby]);
  const [categories, setCategories] = useState([]);
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
        <Roller color="black" />
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
          return (
            <HobbyItem
              key={idx}
              hobby={hobby}
            />
          );
        })
      )
    }
  }

  const renderCategories = () => {
    if (loading === true) {
      return (
        <Roller color="black" />
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
          <div className="row">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 pb-5">
              <h1 className="fw-bold text-light">Find My Hobby</h1>
              <p className="text-light">Cari kegemaranmu sekarang!</p>
              <SearchBar 
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => handleFilterHobby(e, searchTerm)}
              />
            </div>
            <div className="col-lg-4 mx-auto">
              <h3 className="fw-bold text-light">Ingin berkontribusi?</h3>
              <p className="text-light">Silakan menambahkan saran hobi untuk kami</p>
              <a className="btn btn-lg btn-warning fw-bold" href="/saran-hobi" style={{borderRadius: "15px"}}>Beri saran sekarang</a>
            </div>
          </div>
        </div>
      </div>

      <div id="rekomendasi" className="container">
        <div className="row mt-5 mb-3">
          <div className="col-md">
            <h4 className="fw-bold">Rekomendasi Hobi</h4>
          </div>
        </div>
        <div className="row">
          {renderHobbies()}
        </div>
      </div>

      <div id="kategori" className="container">
        <div className="row mt-5 mb-3">
          <div className="col-md">
            <h4 className="fw-bold">Daftar Kategori</h4>
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
