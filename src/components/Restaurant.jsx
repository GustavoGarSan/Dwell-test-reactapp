import { useParams, Link } from "react-router-dom";

const Restaurant = () => {
  const params = useParams();
  return <main>
      <h1>Restaurant Name {params.restaurantId}</h1>
      <div>
          <Link to="/restaurants/create-ticket">Create ticket</Link>
          <p>The maximum number of tickets to purchase is 10</p>
      </div>
      <div>
          <div>
              <h3>Total number of tickets: 2</h3>
          </div>
          <div>
              <h3>Tickets purchased: 3</h3>
          </div>
      </div>
      <div>
          <table>
              <tr>
                  <th>Ticket name</th>
                  <th>Available</th>
                  <th>Actions</th>
              </tr>
              <tr>
                  <td>ticket Coupon</td>
                  <td>True</td>
                  <td>
                      <div>
                          <Link to={`/restaurants/update-ticket/${1}`}>Edit</Link>
                          <Link to={`/restaurants/delete-ticket/${1}`}>Delete</Link>
                      </div>
                  </td>
              </tr>
          </table>
      </div>
  </main>
};

export default Restaurant;
