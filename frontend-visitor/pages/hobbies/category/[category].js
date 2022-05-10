import Footer from '../../../components/footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getHobbiesByCategory, getHobbiesByName } from '../../api/hobby';
import HobbyItem from '../../../components/hobbyItem';
import NavbarHobby from '../../../components/navbarHobby';
import { Roller } from 'react-awesome-spinners';
import { default_hobby } from '../../../helpers/constants';
import SearchBar from '../../../components/searchBar';
import { TIMEOUT_HALF_A_SECOND } from '../../../../frontend-admin/constants/timeout';


export default function Hobbies() {
  const [hobbies, setHobbies] = useState([default_hobby]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const router = useRouter();
  let search = router.query.search;

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
      handleGetHobbies(category);
    }
  }, []);

  useEffect(() => {
    if (hobbies[0].name !== "name") {
      setLoading(false);
    }
  });

  useEffect(() => {
    setCategory(router.query.category);
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarHobby />

      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row mb-3">
          <div className="col-md-6 offset-md-3">
            <SearchBar
              onChange={(e) => {
                setTimeout(() => {
                  if (e.target.value !== "") {
                    handleFilterHobby(e.target.value);
                  } else {
                    handleGetHobbies(router.query.category);
                  }
                }, TIMEOUT_HALF_A_SECOND)
              }}
              onClick={(e) => {
                setTimeout(() => {
                  if (e.target.value !== "") {
                    handleFilterHobby(e.target.value);
                  } else {
                    handleGetHobbies(router.query.category);
                  }
                }, TIMEOUT_HALF_A_SECOND)
              }}
            />
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
    </div>
  )
}