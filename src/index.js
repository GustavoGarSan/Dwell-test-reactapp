import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Restaurants from "./components/Restaurants";
import Restaurant from "./components/Restaurant";
import TicketForm from "./components/TicketForm";
import TicketDeleteForm from "./components/TicketDeleteForm";
import PurchaseTicket from "./components/PurchaseTicket";
import Home from "./components/Home";
import Auth from "./components/Auth";
import App from "./App";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="login" element={<Auth />} />
          <Route
            path="restaurants/create-ticket"
            element={<TicketForm isCreation={true} />}
          />
          <Route
            path="restaurants/update-ticket/:ticketId"
            element={<TicketForm isCreation={false} />}
          />
          <Route
            path="restaurants/delete-ticket/:ticketId"
            element={<TicketDeleteForm />}
          />
          <Route
            path="restaurants/purchase/:ticketId"
            element={<PurchaseTicket />}
          />
          <Route path="restaurant/:restaurantId" element={<Restaurant />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
