import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Restaurants = () => {
  let navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const isAuth = useSelector((state) => state.isAuthenticated);

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

    if (isAuth) {
      fetchRestaurants().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    } else {
      navigate("/login");
    }
  }, [isAuth, navigate]);

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

  return (
    <main>
      <div>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Restaurants;
