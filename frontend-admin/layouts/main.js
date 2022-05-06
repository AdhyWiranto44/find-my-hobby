import { useState } from 'react';
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import Title from '../components/title';


export default function MainLayout(props) {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Sidebar isActive={isActive} />
      <div id="navbar" className={ isActive ? "marginLeftMinimized" : "marginLeft" }>
        <Navbar toggleSidebar={toggleSidebar} />
        {/* <Alert /> */}
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-md">
              <Title title={props.title} />
            </div>
          </div>

          {props.content}
        </div>
      </div>

      <footer className="text-secondary text-center py-3 mt-auto marginLeftMinimized" style={{marginTop: "250px"}}>
        Open Store &#169; {new Date().getFullYear()}. Made with &#10084; By Adhy Wiranto
      </footer>
    </div>
  )
}