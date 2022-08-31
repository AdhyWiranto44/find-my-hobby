import Link from "next/link";
import Image from 'next/image'
import domain from "../constants/domain";


export default function HobbyItem(props) {
  return (
    <div id="hobbyItem" className="col-6 col-md-4 col-lg-3">
      <Link href={`/hobby/${props.hobby.slug}`}>
        <a>
          <div className="card bg-dark bg-opacity-50 text-white border-0 shadow overflow-hidden mb-4" style={{ borderRadius: "15px" }}>
            <img src={props.hobby.img !== "" ? `${domain}/getFile/${props.hobby.img}` : "/img/hobi.webp"} className="card-img w-100" width={100} height={300} alt="Gambar Hobi" />
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