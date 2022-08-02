import Image from "next/image";
import Link from "next/link";

export default function NavbarLogoOnly() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom sticky-top" style={{
      backgroundColor: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(10px)"
      }}>
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">
            <Image src="/img/logo.webp" width={35} height={35} alt="Logo Find My Hobby" />
          </a>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <div className="nav-menu">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </button>
      </div>
    </nav>
  );
}