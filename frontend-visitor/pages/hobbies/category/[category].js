import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getHobbiesByCategory } from '../../../api/hobby';
import HobbyItem from '../../../components/hobbyItem';
import NavbarHobby from '../../../components/navbarHobby';


export default function Hobbies() {
  const [hobbies, setHobbies] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const router = useRouter();
  const category = router.query.category;

  const handleGetHobbies = async (category) => {
    await getHobbiesByCategory(category).then(data => {
      setHobbies(data.data.data.hobbies);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleFilterHobby = (e, term) => {
    e.preventDefault();
    // filter hobby
    // set hobby by filter
  }

  useEffect(() => {
    handleGetHobbies(category);
  }, []);

  return (
    <>
      <NavbarHobby />

      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row mb-3">
          <div className="col-md-6 offset-md-3">
            <div className="d-flex bg-white border shadow p-2" style={{ borderRadius: "15px" }}>
              <input type="text" className="form-control border-0" id="title" name="title" placeholder="cari berdasarkan nama" value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} />
              <button 
                type="button" 
                className="btn btn-danger border-0" 
                onClick={(e) => handleFilterHobby(e, filterTerm)}
                style={{ borderRadius: "10px" }}>Cari</button>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md">
            <h4 className="fw-bold">Daftar Hobi</h4>
            <h6>Kategori: {category}</h6>
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

      <Footer />
    </>
  )
}