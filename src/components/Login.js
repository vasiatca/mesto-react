import { createRef } from "react";
import { useHistory } from "react-router-dom";
import AuthApi from "./../utils/AuthApi";

const Login = ({ setUser }) => {
  const history = useHistory();
  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    AuthApi.login({ password, email })
      .then(() => {
        AuthApi.getUser().then(({ data }) => setUser(data));

        history.push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <form
        className="popup__content"
        name="register"
        onSubmit={handleSubmit}
        action="#"
        noValidate
      >
        <input
          type="email"
          className="popup__field"
          name="email"
          ref={emailRef}
          required
        />
        <input
          type="password"
          className="popup__field"
          name="password"
          ref={passwordRef}
          required
        />

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
