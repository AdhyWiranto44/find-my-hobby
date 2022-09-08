import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHobby } from "../api/hobby";
import Footer from "../../components/footer";
import NavbarHobby from "../../components/navbarHobby";
import domain from "../../constants/domain";
import getImgSrc from "../../helpers/getImgSrc";

export default function HobbyPage() {
  const [hobby, setHobby] = useState({
    "name": "name",
    "slug": "slug",
    "description": "description",
    "category": "category",
    "img": "",
  });
  const router = useRouter();
  const slug = router.query.slug;

  const handleGetHobby = async (slug) => {
    await getHobby(slug).then(data => {
      setHobby(data.data.data.hobby);
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    handleGetHobby(slug);
  }, [slug]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarHobby />

      <div id="welcome" className="bg-warning" style={{
        backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.8),rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(${getImgSrc(hobby)})`,
        backgroundAttachment: "initial",
        backgroundSize: "cover"
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5 offset-md-1">
              <h1 className="fw-bold text-light">{hobby.name}</h1>
              {hobby.community_link && (<h6 className="fw-bold text-light">Link Komunitas: <a className="text-light" href={hobby.community_link}>{hobby.community_name}</a>
              </h6>)}
              <Link href={`/hobbies/category/${hobby.category}`}>
                <a className="btn btn-outline-light mt-2" style={{borderRadius: "15px"}}>{hobby.category}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <div className="row my-3">
          <div className="col-lg-6 offset-lg-1">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a className="text-decoration-none">Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item active fw-bold" aria-current="page">{hobby.name}</li>
            </ol>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-lg-6 offset-lg-1">
            {hobby.description}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}