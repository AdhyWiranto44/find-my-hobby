import MainLayout from '../layouts/main'

export default function Home() {
  return (
    <MainLayout
      title="Dashboard"
      content={
        <>
          <div className="row mt-3">
            <div className="col-lg-4">
              <div class="card p-2 border-0 shadow mb-3">
                <div class="card-body text-center">
                  <div class="d-flex align-items-between justify-content-center">
                    <i class="bi bi-card-list me-2 h4 text-salmon"></i>
                    <h5 class="fw-bold mb-0">Hobi</h5>
                  </div>
                  <h3 class="py-3">999</h3>
                    <a href="#" class=" btn btn-light px-3 text-decoration-none text-secondary"><small>Detail</small></a>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}
