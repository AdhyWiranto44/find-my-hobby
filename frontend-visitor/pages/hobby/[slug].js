import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHobby } from "../../api/hobby";
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
    <>
      <Navbar />

      <div id="welcome" class="bg-warning">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-10 col-md-8 col-lg-5 offset-md-1">
              <h1 class="fw-bold text-light">{hobby.name}</h1>
              <p class="text-light">Kategori: {hobby.category}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row my-3">
          <div class="col-12 col-sm-10 col-md-8 col-lg-5 offset-md-1">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link href="/">
                  <a class="text-decoration-none">Home</a>
                </Link>
              </li>
              <li class="breadcrumb-item active fw-bold" aria-current="page">{hobby.name}</li>
            </ol>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 offset-md-1">
            {hobby.description}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}