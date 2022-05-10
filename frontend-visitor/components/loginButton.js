import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_ADMIN_DOMAIN}/login` || "http://localhost:3001/login"}>
      <a className="nav-link fw-bold ms-3 btn btn-outline-secondary px-3" style={{borderRadius: "15px"}}>Login</a>
    </Link>
  )
}