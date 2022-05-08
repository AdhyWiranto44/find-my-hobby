import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import Title from '../components/title'
import Cookies from 'js-cookie'
import { tokenCookie } from '../constants/cookies'


export default function MainLayout(props) {
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()
  const token = Cookies.get(tokenCookie)

  useEffect(() => {
    if (!token || token === "") router.push("/login")
  })

  const toggleSidebar = () => {
    if (isActive) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Sidebar isActive={isActive} />
      <div id="navbar" className={ isActive ? "marginLeftMinimized" : "marginLeft" }>
        <Navbar toggleSidebar={toggleSidebar} />
        {/* <Alert /> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md">
              <Title title={props.title} />
            </div>
          </div>

          {props.content}
        </div>
      </div>

      <footer className="text-secondary text-center py-3 mt-auto marginLeftMinimized" style={{marginTop: "250px"}}>
        <b>Find My Hobby</b> &#169; {new Date().getFullYear()}. Made with &#10084; By <a className="link-dark" href="https://github.com/adhywranto44" target="_blank">Adhy Wiranto</a>
      </footer>
    </div>
  )
}