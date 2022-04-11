import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import validator from "validator";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: "Rodri@gmail.com",
    password: "123456",
  });
  
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("El email no es valido"));
      return false;
    } else if (password.length < 5) {
      dispatch(setError("La contraseña debe tener al menos 6 caracteres"));
      return false;
    }

    return true;
  };

  return (
    <div>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block" type="submit">
          {" "}
          Login{" "}
        </button>
        <hr />
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google"
              />
            </div>
            <p className="btn-text">
              <b>Sign in whit Google</b>{" "}
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </div>
  );
};
