import { useRouter } from 'next/router';
import Title from '../components/title';


export default function Login() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/");
  }

  return (
    <div className="bg-salmon">
      <div className="container-fluid">
        <div className="row position-absolute h-100 w-100 overflow-hidden">
          <div className="col-lg-6 login d-flex align-items-center justify-content-center">
            <form className="login-form" onSubmit={(e) => handleLogin(e)}>
              <div className="text-center text-uppercase" style={{ letterSpacing: "3px" }}>
                <Title title="Login" />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label small mb-1">username</label>
                <input type="text" className="form-control p-3" id="username" name="username" required autofocus />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label small mb-1">password</label>
                <input type="password" className="form-control p-3" id="password" name="password" required />
              </div>
              <button type="submit" className="btn btn-salmon w-100 p-3 mt-3 fw-bold text-uppercase">login</button>
            </form>
          </div>
          <div className="col-lg-6 d-none d-lg-block p-0 overflow-hidden">
            <img className="w-100 h-100" src="/img/login_bg.jpg" alt="login_bg" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  )
}