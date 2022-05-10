export default function Notification(props) {
  return (
    <div className={`alert ${props.color} border-0 welcome-card shadow-sm fade show position-absolute me-3 mt-3`} role="alert" style={{zIndex: 9999}}>
        {props.message}
    </div>
  )
}