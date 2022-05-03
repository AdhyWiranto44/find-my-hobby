import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHobby } from "../api/hobby";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

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
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div id="welcome" className="bg-warning">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5 offset-md-1">
              <h1 className="fw-bold text-light">{hobby.name}</h1>
              <p className="text-light">Kategori: {hobby.category}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <div className="row my-3">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 offset-md-1">
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
        <div className="row">
          <div className="col-md-8 offset-md-1">
            {hobby.description}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}