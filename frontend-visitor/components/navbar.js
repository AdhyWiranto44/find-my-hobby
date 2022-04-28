import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link href="/"><a className="navbar-brand"><img src="/img/logo.webp" width="35" alt="Find My Hobby" /></a></Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <div className="nav-menu" onClick="openNavMenu(this)">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link fw-bold ms-3" href="#rekomendasi">REKOMENDASI HOBI</a>
            <a className="nav-link fw-bold ms-3" href="#kategori">KATEGORI</a>
            <a className="nav-link fw-bold ms-3" href="/carikan-saya-hobi">CARIKAN SAYA HOBI</a>
          </div>
        </div>
      </div>
    </nav>
  );
}