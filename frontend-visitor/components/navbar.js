import Link from "next/link";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <Link href="/"><a class="navbar-brand"><img src="/img/logo.webp" width="35" alt="Find My Hobby" /></a></Link>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <div class="nav-menu" onclick="openNavMenu(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link fw-bold ms-3" href="#rekomendasi">REKOMENDASI HOBI</a>
            <a class="nav-link fw-bold ms-3" href="#kategori">KATEGORI</a>
            <a class="nav-link fw-bold ms-3" href="/carikan-saya-hobi">CARIKAN SAYA HOBI</a>
          </div>
        </div>
      </div>
    </nav>
  );
}