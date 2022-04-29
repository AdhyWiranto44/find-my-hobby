import Link from "next/link";


export default function HobbyItem(props) {
  return (
    <div key={props.key} className="col-12 col-md-4 col-lg-3">
      <Link href={`/hobby/${props.hobby.slug}`}>
        <a>
          <div className="card bg-dark text-white border-0 shadow overflow-hidden mb-4" style={{ borderRadius: "15px" }}>
            <img src="/img/hobi.webp" className="card-img w-100" alt="rekomendasi hobi" />
            <div className="card-img-overlay d-flex">
              <div className="mt-auto">
                <h5 className="card-title fw-bold">{props.hobby.name}</h5>
                <p className="card-text text-justify">{props.hobby.description.substring(0, 30)}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}