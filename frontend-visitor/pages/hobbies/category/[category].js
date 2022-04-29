import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getHobbiesByCategory, getHobbiesByName } from '../../../api/hobby';
import HobbyItem from '../../../components/hobbyItem';
import NavbarHobby from '../../../components/navbarHobby';
import { Roller } from 'react-awesome-spinners';


export default function Hobbies() {
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const category = router.query.category;

  const handleGetHobbies = async (category) => {
    await getHobbiesByCategory(category).then(data => {
      setHobbies(data.data.data.hobbies);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleFilterHobby = async (name) => {
    const data = await getHobbiesByName(name);
    const foundHobbies = [...data.data.data.hobbies];
    setHobbies(foundHobbies);
  }

  const renderHobbies = () => {
    if (loading === true) {
      return (
        <Roller color="black" />
      )
    } else {
      return (
        hobbies.map((hobby, idx) => {
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

  useEffect(() => {
    handleGetHobbies(category);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  return (
    <>
      <NavbarHobby />

      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row mb-3">
          <div className="col-md-6 offset-md-3">
            <div className="d-flex bg-white border shadow p-2" style={{ borderRadius: "15px" }}>
              <input type="text" className="form-control border-0" id="title" name="title" placeholder="cari berdasarkan nama" onChange={(e) => {
                if (e.target.value !== "") {
                  handleFilterHobby(e.target.value);
                } else {
                  handleGetHobbies(router.query.category);
                }
              }} />
              <button 
                type="button" 
                className="btn btn-danger border-0" 
                onClick={(e) => {
                  if (e.target.value !== "") {
                    handleFilterHobby(e.target.value);
                  } else {
                    handleGetHobbies(router.query.category);
                  }
                }}
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
          {renderHobbies()}
        </div>
      </div>

      <Footer />
    </>
  )
}