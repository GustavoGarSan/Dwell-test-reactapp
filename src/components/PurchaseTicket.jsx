import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PurchaseTicket = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [ticket, setTicket] = useState({});
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [purchaseError, setPurchaseError] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/ticket/${params.ticketId}`
      );
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData);
      }
      const responseData = await response.json();

      setTicket(responseData);

      const responseRest = await fetch(
        `http://127.0.0.1:8000/api/purchase/${params.ticketId}`
      );
      if (!responseRest.ok) {
        throw new Error("Something went wrong!");
      }
      const responseDataRest = await responseRest.json();
      setRestaurant(responseDataRest);
      setIsLoading(false);
    };

    fetchTicket().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [params.ticketId]);

  const purchaseHandler = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/api/purchase/${params.ticketId}/`, {
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        navigate("/");
      } else {
        setPurchaseError(true);
      }
    });
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  const layout = (
    <main>
      <div>
        <h1>Purchase Ticket {ticket.name}</h1>
        {purchaseError && <h3>Sorry, this ticket is no more available</h3>}
        {ticket.available && (
          <form onSubmit={purchaseHandler}>
            <p>Are you sure to buy it?</p>
            <Link to="/">Go Back</Link>
            <button>Buy</button>
          </form>
        )}
        {!ticket.available && (
          <div>
            <h3>Sorry, this ticket is not available</h3>
            <Link to="/">Go Back</Link>
          </div>
        )}
      </div>
      <div>
        <h3>Other tickets availables for restuarant</h3>
        <table>
          <tr>
            <th>Ticket name</th>
            <th>Actions</th>
          </tr>
          {restaurant.tickets.map(
            (ticket) =>
              ticket.available && (
                <tr key={ticket.id}>
                  <td>{ticket.name}</td>
                  <td>
                    <Link to={`/restaurants/purchase/${ticket.id}`}>
                      Purchase it
                    </Link>
                  </td>
                </tr>
              )
          )}
        </table>
      </div>
    </main>
  );

  return layout;
};

export default PurchaseTicket;
