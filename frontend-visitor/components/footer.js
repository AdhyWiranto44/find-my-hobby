export default function Footer() {
  const domain = process.env.NEXT_PUBLIC_ADMIN_DOMAIN || "http://localhost:3001"

  return (
    <footer id="footer" className="bg-warning mt-auto">
      <div className="container">
        <div className="row border-dark">
          <div className="col-md text-center py-3">
            <small className="mr-2">&#169; {new Date().getFullYear()}. Made with <a className="text-decoration-none text-dark" href={`${domain}/login`}>&#10084;</a> By Adhy Wiranto</small>
          </div>
        </div>
      </div>
    </footer>
  );
}