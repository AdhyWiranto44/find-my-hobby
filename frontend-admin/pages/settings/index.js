import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main";
import { usernameCookie } from "../../constants/cookies";

export default function SettingPage() {
  const [username, setUsername] = useState("username")

  useEffect(() => {
    setUsername(Cookies.get(usernameCookie))
  }, [])

  return (
    <MainLayout
      title="Pengaturan"
      content={
        <>
          <Link href={`/users/edit/password/${username}`}>
            <a className="btn btn-warning me-2"><span className="bi bi-key-fill"></span> Ubah Password</a>
          </Link>
        </>
      }
    />
  );
}