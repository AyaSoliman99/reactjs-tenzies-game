import "../style.scss";
export default function Die(props) {
  let bg = props.isHeld ? "#59E391" : "white";
  return (
    <div
      className="die-container"
      style={{ background: bg }}
      onClick={props.getId}
    >
      <h4>{props.value}</h4>
    </div>
  );
}
