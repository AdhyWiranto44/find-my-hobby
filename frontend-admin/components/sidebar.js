import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'


export default function Sidebar(props) {
  const router = useRouter()

  const menus = [
    {
      "title": "Dashboard",
      "href": "/",
      "icon": "bi bi-speedometer",
    },
    {
      "title": "Tambah Hobi",
      "href": "/hobbies/add-new",
      "icon": "bi bi-plus-circle-fill",
    },
    {
      "title": "Tampil Hobi",
      "href": "/hobbies",
      "icon": "bi bi-card-list",
    },
    {
      "title": "Tambah Kategori",
      "href": "/categories/add-new",
      "icon": "bi bi-plus-circle-fill",
    },
    {
      "title": "Tampil Kategori",
      "href": "/categories",
      "icon": "bi bi-card-list",
    },
    {
      "title": "Tampil Saran Hobi",
      "href": "/suggestions",
      "icon": "bi bi-card-list",
    },
    {
      "title": "Tampil Pengguna",
      "href": "/users",
      "icon": "bi bi-people-fill",
    },
    {
      "title": "Tampil Hak Akses",
      "href": "/roles",
      "icon": "bi bi-person-rolodex",
    },
    // {
    //   "title": "Ubah Password",
    //   "href": "/users/username/change-password",
    //   "icon": "bi bi-pencil-square",
    // },
    // {
    //   "title": "Reset Password",
    //   "href": "/users/username/reset-password",
    //   "icon": "bi bi-key-fill",
    // },
  ]

  return (
    <>
      <div id="sidebar" className={"sidebar bg-light-salmon position-fixed h-100 overflow-auto border-end border-light border-2 " + (props.isActive ? "sidebarMinimized sidebarHidden" : "")} style={{zIndex: "1"}}>
        <div id="company-image" className="d-flex justify-content-center my-4 overflow-hidden position-relative">
          <Image className="rounded-circle" src="/img/default.jpg" alt="default" width="64" height="64" />
        </div>
        <h5 className="company-name fw-bold text-center">Find My Hobby</h5>
        <ul className="sidebar-menu-container">
        <li className="sidebar-menu-section mt-3">
          <ul>
            {
              menus.map(menu => {
                return (
                  <>
                    <li className={"rounded-start " + (router.pathname == menu.href ? "menu-active" : "")}>
                      <Link href={menu.href}>
                        <a className="d-flex align-items-between" title={menu.title}>
                          <i className={`${menu.icon} me-3 h4`}></i>
                          <p className="mb-0">{menu.title}</p>
                        </a>
                      </Link>
                    </li>
                  </>
                )
              })
            }
          </ul>
        </li>
      </ul>
    </div>
    </>
  )
}