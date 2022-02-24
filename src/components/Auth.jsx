import { useDispatch } from "react-redux";

import { authActions } from "../store/auth";

const Auth = () => {
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login("fjdfgf"));
  };

  return (
    <main>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button>Login</button>
      </form>
    </main>
  );
};

export default Auth;
