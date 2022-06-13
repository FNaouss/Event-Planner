import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Event = (props) => {
  const history = useNavigate();
  const { _id, eventName, start, end } = props.event;
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/events/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/events"));
  };

  return (
    <div className="card">
      <h3>{eventName}</h3>
      <h3>Start Date {start}</h3>
      <h3>End Date {end}</h3>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};

export default Event;
