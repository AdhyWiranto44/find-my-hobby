import domain from "../constants/domain";

export default function getImgSrc(hobby) {
  let imgSrc = "";
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    imgSrc = hobby.img !== "" ? `${domain}/getFile/${hobby.img}` : "/img/hobi.webp"
  } else {
    imgSrc = hobby.img !== "" ? `https://ucarecdn.com/${hobby.img}/-/preview/` : "/img/hobi.webp"
  }

  return imgSrc;
}