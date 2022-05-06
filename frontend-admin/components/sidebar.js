export default function Sidebar(props) {
  const menus = [
    {
      "title": "Dashboard",
      "href": "#",
      "icon": "bi bi-speedometer",
    },
    {
      "title": "Tambah Hobi",
      "href": "#",
      "icon": "bi bi-plus-circle-fill",
    },
    {
      "title": "Tampil Hobi",
      "href": "#",
      "icon": "bi bi-card-list",
    },
    {
      "title": "Tambah Kategori",
      "href": "#",
      "icon": "bi bi-plus-circle-fill",
    },
    {
      "title": "Tampil Kategori",
      "href": "#",
      "icon": "bi bi-card-list",
    },
    {
      "title": "Tampil Saran Hobi",
      "href": "#",
      "icon": "bi bi-card-list",
    },
    {
      "title": "Ubah Password",
      "href": "#",
      "icon": "bi bi-pencil-square",
    },
    {
      "title": "Reset Password",
      "href": "#",
      "icon": "bi bi-key-fill",
    },
  ]

  return (
    <>
      <div id="sidebar" className={"sidebar bg-light-salmon position-fixed h-100 overflow-auto border-end border-light border-2 " + (props.isActive ? "sidebarMinimized sidebarHidden" : "")} style={{zIndex: "1"}}>
        <div id="company-image" className="d-flex justify-content-center my-4 overflow-hidden position-relative">
          <img className="rounded-circle" src="/img/default.jpg" alt="default" width="64" height="64" />
        </div>
        <h5 className="company-name fw-bold text-center">Open Store</h5>
        <ul className="sidebar-menu-container">
        <li className="sidebar-menu-section mt-3">
          <ul>
            {
              menus.map(menu => {
                return (
                  <>
                    <li className="rounded-start">
                      <a className="d-flex align-items-between" href={menu.href} title={menu.title}>
                        <i className={`${menu.icon} me-3 h4`}></i>
                        <p className="mb-0">{menu.title}</p>
                      </a>
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