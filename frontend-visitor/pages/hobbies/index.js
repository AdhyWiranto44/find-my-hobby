import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getHobbies, getHobbiesByName } from '../../api/hobby';
import HobbyItem from '../../components/hobbyItem';
import NavbarHobby from '../../components/navbarHobby';
import SearchBar from '../../components/searchBar';
import { Roller } from 'react-awesome-spinners';
import { default_hobby } from '../../helpers/constants';


export default function Hobbies() {
  const [hobbies, setHobbies] = useState([default_hobby]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  let search = router.query.search;

  const handleGetHobbies = async () => {
    const data = await getHobbies();
    setHobbies(data.data.data.hobbies);
  }

  const handleFilterHobby = async (name) => {
    const data = await getHobbiesByName(name);
    const foundHobbies = [...data.data.data.hobbies];
    setHobbies(foundHobbies);
  }

  const renderHobbies = () => {
    if (loading === true) {
      return (
        <div className="text-center">
          <Roller color="black" />
        </div>
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
    if (search && search !== "") {
      handleFilterHobby(search);
    } else {
      handleGetHobbies();
    }
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
            <SearchBar 
              onChange={(e) => {
                if (e.target.value !== "") {
                  handleFilterHobby(e.target.value);
                } else {
                  handleGetHobbies(router.query.category);
                }
              }}
              onClick={(e) => {
                if (e.target.value !== "") {
                  handleFilterHobby(e.target.value);
                } else {
                  handleGetHobbies(router.query.category);
                }
              }}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md">
            <h4 className="fw-bold">Daftar Hobi</h4>
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