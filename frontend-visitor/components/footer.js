import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const domain = process.env.NEXT_PUBLIC_ADMIN_DOMAIN || "http://localhost:3001"

  return (
    <footer id="footer" className="bg-warning mt-auto border-top border-light">
      <div className="container pt-5">
        <div className="row mb-3">
          <div className="col-md-3 mb-3 mb-md-0">
            <p className="mb-1 fw-bold">Technologies</p>
            <a className="myLink mb-1 d-block" href="https://nextjs.org/">NextJS</a>
            <a className="myLink mb-1 d-block" href="https://nodejs.org/">NodeJS</a>
            <a className="myLink mb-1 d-block" href="https://www.postgresql.org/">PostgreSQL</a>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <p className="mb-1 fw-bold">Menus</p>
            <Link href={`${process.env.NEXT_PUBLIC_ADMIN_DOMAIN}/login`}>
              <a className="myLink mb-1 d-block">Login</a>
            </Link>
            <Link href="/#rekomendasi">
              <a className="myLink mb-1 d-block">Rekomendasi</a>
            </Link>
            <Link href="/#kategori">
              <a className="myLink mb-1 d-block">Kategori</a>
            </Link>
            <Link href="/cari-acak">
              <a className="myLink mb-1 d-block">Cari Acak</a>
            </Link>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <p className="mb-1 fw-bold">Kontribusi</p>
            <Link className="myLink mb-1 d-block" href="/saran-hobi">Masukkan idemu di sini</Link>
            <a className="myLink mb-1 d-block" href="https://github.com/AdhyWiranto44/find-my-hobby">Github</a>
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