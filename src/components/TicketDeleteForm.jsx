import { Link } from "react-router-dom";

const TicketDeleteForm = (props) => {
  return (
    <main>
      <form>
        <p>Are you sure you want to delete?</p>
        <Link to="/restaurants">Go back</Link>
        <input type="submit" value="" />
      </form>
    </main>
  );
};

export default TicketDeleteForm;
