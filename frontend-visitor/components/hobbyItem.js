import Link from "next/link";
import Image from 'next/image'


export default function HobbyItem(props) {
  const renderImage = (image) => {
    if (image && image !== null && image !== "") {
      return <Image src={`${process.env.NEXT_PUBLIC_IMG_DIR}/${image}`} className="card-img w-100" width={100} height={300} alt="Gambar Hobi" />
    }
    return <Image src={`/img/hobi.webp`} className="card-img w-100" width={100} height={300} alt="Gambar Hobi" />
  }

  return (
    <div id="hobbyItem" className="col-6 col-md-4 col-lg-3">
      <Link href={`/hobby/${props.hobby.slug}`}>
        <a>
          <div className="card bg-dark text-white border-0 shadow overflow-hidden mb-4" style={{ borderRadius: "15px" }}>
            {renderImage(props.hobby.img)}
            <div className="card-img-overlay d-flex">
              <div className="mt-auto">
                <h6 className="card-title fw-bold">{props.hobby.name}</h6>
                <p className="small card-text text-justify">{props.hobby.description.substring(0, 30)}...</p>
                <Link href={`/hobby/${props.hobby.slug}`}>
                  <a className="btn btn-sm btn-outline-light fw-bold" style={{borderRadius: "10px"}}>Detail</a>
                </Link>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}