export default function Footer() {
  const domain = process.env.NEXT_PUBLIC_ADMIN_DOMAIN || "http://localhost:3001"

  return (
    <footer id="footer" className="bg-warning mt-auto">
      <div className="container">
        <div className="row border-dark">
          <div className="col-md text-center py-3">
            <small className="mr-2"><b>Find My Hobby</b> &#169; {new Date().getFullYear()}. Made with <a className="text-decoration-none text-dark" href={`${domain}/login`} target="_blank">&#10084;</a> By <a className="link-dark" href="https://github.com/adhywiranto44" target="_blank" rel="noreferrer">Adhy Wiranto</a></small>
          </div>
        </div>
      </div>
    </footer>
  );
}