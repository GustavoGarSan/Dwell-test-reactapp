import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RestaurantsPublic = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/restaurants/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedRestaurants = [];

      for (const i in responseData) {
        loadedRestaurants.push({
          id: responseData[i].id,
          name: responseData[i].name,
          tickets: responseData[i].tickets,
        });
      }

      setRestaurants(loadedRestaurants);
      setIsLoading(false);
    };

    fetchRestaurants().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

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

  const restaurantList = restaurants.map((rest) => (
    <div key={rest.id}>
      <h3>{rest.name}</h3>
      <div>
        {rest.tickets.map(
          (ticket) =>
            ticket.available && (
              <div key={ticket.id}>
                <Link to={`/restaurants/purchase/${ticket.id}`}>
                  {ticket.name}
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  ));

  return <section>{restaurantList}</section>;
};

export default RestaurantsPublic;
