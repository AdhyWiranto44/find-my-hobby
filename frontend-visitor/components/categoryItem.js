export default function CategoryItem(props) {
  return (
    <div key={props.key} className="col-12 col-md-4 col-lg-3">
      <a className=" text-decoration-none text-dark" href={`/category/${props.category.slug}`}>
        <div className="card bg-light shadow border-0 mb-4" style={{ borderRadius: "15px" }}>
          <div className="card-body text-center pb-2">
            <h6 className="card-title">{props.category.name}</h6>
          </div>
        </div>
      </a>
    </div>
  )
}