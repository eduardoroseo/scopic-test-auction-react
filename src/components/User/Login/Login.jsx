import React, { useContext, useEffect, useState } from "react";
import UIButton from "components/UI/Button/Button";

import "./Login.css";
import StoreContext from "components/Store/Context";
import { useHistory } from "react-router";

function initialState() {
  return { user: "user@scopic-auction.com", password: "password" };
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState());
  const { token, handleLogin } = useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      return history.push('/');
    }
  })

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function onSubmit(event) {
    event.preventDefault();

    const { user, password } = values;

    await handleLogin(user, password);

    setValues(initialState);
  };

  return (
    <div className="user-login">
      <h1 className="user-login__title">Auction - Antique Items</h1>
      <form autoComplete="nope" onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            name="user"
            onChange={onChange}
            value={values.user}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Sign In
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
