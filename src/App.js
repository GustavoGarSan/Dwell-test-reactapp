import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <Fragment>
      <nav>
        <Link to="/restaurants">Restaurants</Link>
        {!isAuth && <Link to="/login">Login</Link>}
        {isAuth && <button onClick={logoutHandler}>Logout</button>}
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default App;
