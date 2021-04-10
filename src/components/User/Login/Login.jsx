import React, { useContext, useState } from "react";
import UIButton from "components/UI/Button/Button";

import "./Login.css";
import StoreContext from "components/Store/Context";
import { useHistory } from "react-router";

function initialState() {
  return { user: "", password: "" };
}

function login({ user, password }) {
  if (user === 'admin@admin.com' && password === 'admin') {
    return { token: '1234' };
  }
  return { error: 'Usuário ou senha inválido' };
}


const UserLogin = () => {
  const [values, setValues] = useState(initialState());
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function onSubmit(event) {
    event.preventDefault();

    const { token } = login(values);

    if (token) {
      setToken(token);
      return history.push('/');
    }

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
