import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { removeError, setError } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterWhitEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWhitEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("El nombre no es valido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email no valido"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError("La contraseña debe tener al menos 6 caracteres y ser iguales")
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <div>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          type="text"
          placeholder="Nombre"
          name="name"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Contraseña"
          name="password"
          autoComplete="off"
          onChange={handleInputChange}
          value={password}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirmar contraseña"
          name="password2"
          autoComplete="off"
          onChange={handleInputChange}
          value={password2}
        />
        <button className="mb-5 btn btn-primary btn-block" type="submit">
          {" "}
          Register{" "}
        </button>

        <Link className="link" to="/auth/login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};
