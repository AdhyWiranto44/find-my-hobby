import Image from "next/image";

export default function Footer() {
  const domain = process.env.NEXT_PUBLIC_ADMIN_DOMAIN || "http://localhost:3001"

  return (
    <footer id="footer" className="bg-warning mt-auto border-top border-light">
      <div className="container pt-5">
        <div className="row mb-3">
          <div className="col-md-3">
            <p className="mb-1 fw-bold">Technologies</p>
            <a className="myLink mb-1 d-block" href="#">NextJS</a>
            <a className="myLink mb-1 d-block" href="#">NodeJS</a>
            <a className="myLink mb-1 d-block" href="#">PostgreSQL</a>
            <a className="myLink mb-1 d-block" href="#">Google Cloud Platform</a>
          </div>
          <div className="col-md-3">
            <p className="mb-1 fw-bold">Menus</p>
            <a className="myLink mb-1 d-block" href="#">Rekomendasi</a>
            <a className="myLink mb-1 d-block" href="#">Kategori</a>
            <a className="myLink mb-1 d-block" href="#">Cari Acak</a>
          </div>
          <div className="col-md-3">
            <p className="mb-1 fw-bold">Kontribusi</p>
            <a className="myLink mb-1 d-block" href="#">Masukkan idemu di sini</a>
            <a className="myLink mb-1 d-block" href="#">Github</a>
          </div>
          <div className="col-md-3">
            <Image src="/img/logo.webp" width={50} height={50} alt="Logo Find My Hobby" />
            <h5 className="fw-bold">Find My Hobby</h5>
            <p>an open source software</p>
          </div>
        </div>
        <div className="row border-dark border-top">
          <div className="col-md text-center py-3">
            <small className="mr-2"><b>Find My Hobby</b> &#169; {new Date().getFullYear()}. Made with <a className="text-decoration-none text-dark" href={`${domain}/login`} target="_blank" rel="noreferrer">&#10084;</a> By <a className="link-dark" href="https://github.com/adhywiranto44" target="_blank" rel="noreferrer">Adhy Wiranto</a></small>
          </div>
        </div>
      </div>
    </footer>
  );
}