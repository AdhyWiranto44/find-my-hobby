import { useEffect, useState } from 'react'
import { getHobbies } from '../api/hobby';
import { getCategories } from '../api/category';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HobbyItem from '../components/hobbyItem';
import CategoryItem from '../components/categoryItem';
import { useRouter } from 'next/router';

export default function Home() {
  const [hobbies, setHobbies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    handleGetHobbies();
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <>
      <Navbar />

      <div id="welcome" className="container-fluid bg-warning">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 pb-5">
              <h1 className="fw-bold text-light">Find My Hobby</h1>
              <p className="text-light">Cari kegemaranmu sekarang!</p>
              <div className="d-flex bg-white p-2 shadow mt-4" style={{borderRadius: "15px"}}>
                <input type="text" className="form-control border-0" id="title" name="title" placeholder="contoh: Menulis" autoFocus={true} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button 
                  type="button" 
                  className="btn btn-danger border-0" 
                  onClick={(e) => handleFilterHobby(e, searchTerm)}
                  style={{borderRadius: "10px"}}>Cari</button>
              </div>
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
          {
            hobbies.map((hobby, idx) => {
              return (
                <HobbyItem
                  key={idx}
                  hobby={hobby}
                />
              );
            })
          }
        </div>
      </div>

      <div id="kategori" className="container">
        <div className="row mt-5 mb-3">
          <div className="col-md">
            <h4 className="fw-bold">Daftar Kategori</h4>
          </div>
        </div>
        <div className="row mb-5">
          {
            categories.map((category, idx) => {
              return (
                <CategoryItem
                  key={idx}
                  category={category}
                />
              );
            })
          }
        </div>
      </div>

      <Footer />
    </>
  )
}
