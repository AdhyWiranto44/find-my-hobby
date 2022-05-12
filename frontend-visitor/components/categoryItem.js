import Link from "next/link";

export default function CategoryItem(props) {
  return (
    <div id="categoryItem" className="col-6 col-md-3 col-lg-2">
      <Link href={`/hobbies/category/${props.category.slug}`}>
        <a className="text-decoration-none text-dark">
          <div className="card bg-light border mb-4" style={{ borderRadius: "15px" }}>
            <div className="card-body text-center pb-2">
              <p className="card-title">{props.category.name}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}