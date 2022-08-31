import { Widget } from "@uploadcare/react-widget";


export default function UploadField({form, setForm}) {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    return (
      <div className="mb-3">
        <label htmlFor="img" className="form-label small mb-1 text-capitalize">gambar</label>
        <input type="file" className="form-control p-3" id="img" name="img" onChange={(e) => {
          setForm({...form, "file": e.target.files[0]});
        }} />
      </div>
    )
  } else {
    return (
      <div className="mb-3">
        <label className="form-label small mb-1 text-capitalize">gambar</label><br />
        <Widget onChange={(fileInfo) => setForm({...form, "img": fileInfo.uuid})} publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY} />
      </div>
    )
  }
}