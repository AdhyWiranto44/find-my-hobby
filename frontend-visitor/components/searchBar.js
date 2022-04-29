export default function SearchBar(props) {
  return (
    <div className="d-flex bg-white border shadow p-2" style={{ borderRadius: "15px" }}>
      <input
        type="text"
        className="form-control border-0"
        id="title"
        name="title"
        placeholder="cari berdasarkan nama"
        onChange={props.onChange}
      />
      <button
        type="button"
        className="btn btn-danger border-0"
        onClick={props.onClick}
        style={{ borderRadius: "10px" }}>Cari</button>
    </div>
  )
}